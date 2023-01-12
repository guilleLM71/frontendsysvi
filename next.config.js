module.exports = {
    webpack5: true,
    webpack: (config) => {
      config.resolve.fallback = { 
        "child_process": false, 
        "process":  false, 
        "fs": false, 
        "util": false, 
        "http": false,
        "https": false,
        "tls": false,
        "net": false,
        "crypto": false, 
        "path": false,
        "os": false, 
        "stream": false,
        "zlib": false
        };
  
      return config;
    },
  };