let DEBUG = true;
let HOST_URL = HOST_URL = "http://192.168.2.12:8000";
let SOCKET_URL = "ws://192.168.2.12:8000";
if (DEBUG) {
  HOST_URL = "http://127.0.0.1:8000";
  SOCKET_URL = "ws://127.0.0.1:8000";
}

export { HOST_URL, SOCKET_URL };
