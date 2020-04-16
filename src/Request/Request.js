global.Request = function (url, tokens) {
  var core = {
    ajax: function (method, url, args, payload, files) {
      return new Promise(function (resolve, reject) {
        var client = new XMLHttpRequest();
        var uri = url;
        var data = "";
        if (
          args &&
          (method === "POST" || method === "PUT" || method === "PATCH")
        ) {
          var argcount = 0;
          for (var key in args) {
            if (args.hasOwnProperty(key)) {
              if (argcount++) {
                data += "&";
              }
              data +=
                encodeURIComponent(key) + "=" + encodeURIComponent(args[key]);
            }
          }
        }
        client.open(method, uri);
        if (tokens) {
          client.setRequestHeader("x-organization-id", tokens.orgId);
          client.setRequestHeader("X-CSRF-TOKEN", tokens.xsrf);
        }
        client.withCredentials = true;

        if (files) {
          var data = new FormData();
          if (files.length != 0) {
            for (var i = 0, len = files.length; i < len; i++) {
              data.append("file", files[i]);
            }
          }
          client.send(data);
        } else if (payload) {
          client.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
          );
          client.send(`jsonString=${JSON.stringify(payload)}`);
        } else {
          client.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
          );
          client.send(data);
        }

        client.onload = function () {
          if (
            this.status === 200 ||
            this.status === 201 ||
            this.status === 204
          ) {
            var response = this.response ? this.response : this.responseText;
            if (response === "") {
              resolve({ responseStatus: this.status });
            } else {
              try {
                if (JSON.parse(response)) {
                  resolve(JSON.parse(response));
                }
              } catch (e) {
                resolve(response);
              }
            }
          } else {
            reject(this);
          }
        };
        client.onerror = function (e) {
          reject(this);
        };
      });
    },
  };

  return {
    get: function () {
      return core.ajax("GET", url);
    },
    post: function (args, payload) {
      return core.ajax("POST", url, args, payload);
    },
    patch: function (args, payload, files) {
      return core.ajax("PATCH", url, args, payload, files);
    },
    put: function (args, payload, files) {
      return core.ajax("PUT", url, args, payload, files);
    },
    del: function () {
      return core.ajax("DELETE", url);
    },
    attach: function (files, onProcess) {
      return core.ajax("POST", url, {}, undefined, files);
    },
  };
};
export default Request;
