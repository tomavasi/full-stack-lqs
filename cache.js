const cache = new Map();

export const getFromCache = (moduleId) => {
  return cache.get(moduleId);
};

export const setToCache = (moduleId, module) => {
  cache.set(moduleId, module);
};

export const clearCache = (moduleId) => {
  cache.delete(moduleId);
};