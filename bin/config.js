module.exports = {
    development : {
      postgre: {
        user: "postgres",
        password: "postpassword",
        database: "myData",
        host: "192.168.0.39",
        port: 5432
      },
      thumbnailPath: "D:/Goods_Resources/thumbnails/",
      resourcePath: "D:/Goods_Resources/resources/",
      logFilePath: "D:/Goods_Resources/logs/"
    },
    production : {
      postgre: {
        user: "postgres",
        password: "postpassword",
        database: "myData",
        host: "localhost",
        port: 5432
      },
      resourcePath: "/home/admin/Goods_Resources/resources/",
      logFilePath: "/home/admin/Goods_Resources/logs/",
      tempFileName: "/home/admin/Goods_Resources/dht11",
    },
    dateString: {
      temperature: "YYYY-MM-DD HH:mm:ss",
      postgreSearchQuery: "YYYY-MM-DD",
      log: "YYYYMMDD",
      resource: "YYYYMMDDHHmmss",
      // postgreTimeStamp: 'YYYY-MM-DD HH24:MI:00'
    }
  }