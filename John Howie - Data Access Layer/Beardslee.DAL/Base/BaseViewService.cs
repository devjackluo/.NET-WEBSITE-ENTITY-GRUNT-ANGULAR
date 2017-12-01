using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace JohnHowie.DAL.Services
{
    abstract public class BaseViewService<T, U> : AbstractBaseService<T>
        where T : DbContext
        where U : class
    {
        public BaseViewService(T context) : base(context) { }


        public virtual U Find(params object[] keyValues)
        {
            return _context.Set<U>().Find(keyValues);
        }

        public virtual Task<U> FindAsync(params object[] keyValues)
        {
            return _context.Set<U>().FindAsync(keyValues);
        }

        public virtual Task<U> FindAsync(CancellationToken cancellationToken, params object[] keyValues)
        {
            return _context.Set<U>().FindAsync(cancellationToken, keyValues);
        }

        public IQueryable<U> Query()
        {
            return _context.Set<U>();
        }

        public IQueryable<U> Query(params string[] includes)
        {
            var set = _context.Set<U>().AsQueryable();

            foreach (var i in includes)
            {
                set = set.Include(i);
            }

            return set;
        }

        public IQueryable<U> Query(params Expression<Func<U, object>>[] includes)
        {
            var set = _context.Set<U>().AsQueryable();

            foreach (var i in includes)
            {
                set = set.Include(i);
            }

            return set;
        }
    }
}
