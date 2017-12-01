using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JohnHowie.DAL.Services
{
    abstract public class AbstractBaseService<T>
        where T : DbContext
    {
        protected readonly T _context;
        protected readonly ObjectContext _objectContext;

        public AbstractBaseService(T context)
        {
            _context = context;
            _objectContext = ((IObjectContextAdapter)_context).ObjectContext;
        }

        static internal string CleanName(string name)
        {
            var split = name.Replace("[", "")
                            .Replace("]", "")
                            .Split('.');

            return string.Join(".", split.Select(a => "[" + a + "]"));
        }



        protected async Task<int> CommandProcAsync(string name, object parameters)
        {
            var p = BuildParameters(parameters);

            var sql = ProcQuery(name, p);

            return await _context.Database.ExecuteSqlCommandAsync(sql, p.ToArray());
        }

        protected async Task<List<U>> QueryProcAsync<U>(string name, object parameters)
        {
            var p = BuildParameters(parameters);

            var sql = ProcQuery(name, p);

            return await _context.Database.SqlQuery<U>(sql, p.ToArray())
                                          .ToListAsync();
        }

        protected async Task<U> ScalarFunctionAsync<U>(string name, params object[] parameters)
        {
            var sql = "select " + FunctionSignature(name, parameters);

            return await _context.Database.SqlQuery<U>(sql, parameters)
                                          .FirstOrDefaultAsync();
        }

        protected async Task<U> ScalarProcAsync<U>(string name, object parameters)
        {
            var p = BuildParameters(parameters);

            var sql = ProcQuery(name, p);

            return await _context.Database.SqlQuery<U>(sql, p.ToArray())
                                          .FirstOrDefaultAsync();
        }

        protected async Task<List<U>> TableFunctionAsync<U>(string name, params object[] parameters)
        {
            var sql = "select * from " + FunctionSignature(name, parameters);

            var result = await _objectContext.ExecuteStoreQueryAsync<U>(sql, parameters);

            return result.ToList();
        }

        protected void ThrowIfInvalid<U>(U entity) where U : class
        {
            var result = _context.Entry(entity).GetValidationResult();

            if (!result.IsValid)
            {
                var errors = result.ValidationErrors.Select(a => a.ErrorMessage);

                throw new DbEntityValidationException("Validation error: " + string.Join("; ", errors));
            }
        }


        private List<SqlParameter> BuildParameters(object parameters)
        {
            return parameters.GetType()
                             .GetProperties()
                             .Select(a => new SqlParameter("@" + a.Name, a.GetValue(parameters)))
                             .ToList();
        }

        private string ProcQuery(string name, List<SqlParameter> parameters)
        {
            return "exec " + CleanName(name) + " " + string.Join(",", parameters.Select(a => a.ParameterName + " = " + a.ParameterName));
        }

        private string FunctionSignature(string name, params object[] parameters)
        {
            return CleanName(name) + "(" + string.Join(",", parameters.Select((a, i) => "@p" + i).ToList()) + ")";
        }
    }
}
