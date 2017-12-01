using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JohnHowie.DAL.Services
{
    abstract public class BaseTableService<T, U> : BaseViewService<T, U>
         where T : DbContext
         where U : class
    {
        public BaseTableService(T context) : base(context) { }


        public virtual async Task<U> AddAsync(U entity)
        {
            _context.Set<U>().Add(entity);

            await _context.SaveChangesAsync();

            return entity;
        }

        public virtual async Task DeleteAsync(params object[] keys)
        {
            var existing = await _context.Set<U>().FindAsync(keys);

            if (existing != null)
            {
                await DeleteAsync(existing);
            }
        }

        public virtual async Task DeleteAsync(U entity)
        {
            _context.Set<U>().Remove(entity);

            await _context.SaveChangesAsync();
        }

        public virtual async Task<U> UpdateAsync(dynamic entity, params object[] keys)
        {
            if (entity == null)
            {
                return null;
            }

            var existing = await _context.Set<U>().FindAsync(keys);

            if (existing != null)
            {
                _context.Entry(existing).CurrentValues.SetValues(entity);

                await _context.SaveChangesAsync();
            }

            return existing;
        }
    }
}
