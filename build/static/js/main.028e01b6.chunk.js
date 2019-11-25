(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{120:function(e,t,a){e.exports=a(214)},212:function(e,t,a){},214:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),o=a(8),c=a.n(o),r=a(40),i=a(22),l=a(108),u=(a(87),a(63)),m=function(e,t){return Object(u.a)({},e,t)},p={token:null,username:null,error:null,loading:!1},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"AUTH_START":return function(e,t){return m(e,{error:null,loading:!0})}(e);case"AUTH_SUCCESS":return function(e,t){return m(e,{token:t.token,username:t.username,error:null,loading:!1})}(e,t);case"AUTH_FAIL":return function(e,t){return m(e,{error:t.error,loading:!1})}(e,t);case"AUTH_LOGOUT":return function(e,t){return m(e,{token:null,username:null})}(e);default:return e}},d=a(118),g={messages:[],chats:[]},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_MESSAGE":return function(e,t){return m(e,{messages:Object(d.a)(e.messages).concat([t.message])})}(e,t);case"SET_MESSAGES":return function(e,t){return m(e,{messages:t.messages.reverse()})}(e,t);case"GET_CHATS_SUCCESS":return function(e,t){return m(e,{chats:t.chats})}(e,t);default:return e}},E=a(21),v=a(32),k=a(26),b=a(14),y=a(33),S=a(41),w=a(222),O=a(215),C=C="http://192.168.2.12:8000",T="ws://192.168.2.12:8000";C="http://127.0.0.1:8000",T="ws://127.0.0.1:8000";var j=function(){function e(){Object(E.a)(this,e),this.callbacks={},this.socketRef=null}return Object(b.a)(e,null,[{key:"getInstance",value:function(){return e.instance||(e.instance=new e),e.instance}}]),Object(b.a)(e,[{key:"connect",value:function(e){var t=this,a="".concat(T,"/ws/chat/").concat(e,"/");this.socketRef=new WebSocket(a),this.socketRef.onopen=function(){console.log("WebSocket open")},this.socketRef.onmessage=function(e){t.socketNewMessage(e.data)},this.socketRef.onerror=function(e){console.log(e.message)},this.socketRef.onclose=function(){console.log("WebSocket closed."),t.connect()}}},{key:"disconnect",value:function(){this.socketRef.close()}},{key:"socketNewMessage",value:function(e){var t=JSON.parse(e),a=t.command;0!==Object.keys(this.callbacks).length&&("messages"===a&&this.callbacks[a](t.messages),"new_message"===a&&this.callbacks[a](t.message))}},{key:"fetchMessages",value:function(e,t){this.sendMessage({command:"fetch_messages",username:e,chatId:t})}},{key:"newChatMessage",value:function(e){this.sendMessage({command:"new_message",from:e.from,message:e.content,chatId:e.chatId})}},{key:"addCallbacks",value:function(e,t){this.callbacks.messages=e,this.callbacks.new_message=t}},{key:"sendMessage",value:function(e){try{this.socketRef.send(JSON.stringify(Object(u.a)({},e)))}catch(t){console.log(t.message)}}},{key:"state",value:function(){return this.socketRef.readyState}}]),e}();j.instance=null;var A=j.getInstance(),I=a(216),D=function(e){function t(e){var a;return Object(E.a)(this,t),(a=Object(v.a)(this,Object(k.a)(t).call(this,e))).state={message:"",conversationID:""},a.messageChangeHandler=function(e){a.setState({message:e.target.value})},a.sendMessageHandler=function(e){e.preventDefault();var t={from:a.props.username,content:a.state.message,chatId:a.props.match.params.chatID};A.newChatMessage(t),a.setState({message:""})},a.renderTimestamp=function(e){return"".concat(new Date(e))},a.renderMessages=function(e){e.map(function(e,t,n){return e.author!=a.props.username?console.log("SELECTED CONVERSATION: ",e.author):{}}),console.log("CHAT - PARTICIPANT - STATE: ",a.state.conversationID);var t=a.props.username;return e.map(function(e,n,o){return s.a.createElement("li",{key:e.id,style:{marginBottom:o.length-1===n?"45px":"15px"},className:e.author===t?"sent":"replies"},s.a.createElement(I.a,{style:e.author===t?{float:"right"}:{},size:50,icon:"user"}),s.a.createElement("p",null,e.content,s.a.createElement("br",null),s.a.createElement("small",null,a.renderTimestamp(e.timestamp))))})},a.scrollToBottom=function(){a.messagesEnd.scrollIntoView({behavior:"smooth"})},a.initialiseChat(),a}return Object(y.a)(t,e),Object(b.a)(t,[{key:"initialiseChat",value:function(){var e=this;this.waitForSocketConnection(function(){A.fetchMessages(e.props.username,e.props.match.params.chatID)}),A.connect(this.props.match.params.chatID)}}]),Object(b.a)(t,[{key:"waitForSocketConnection",value:function(e){var t=this;setTimeout(function(){if(1===A.state())return console.log("Connection is made"),void e();console.log("wait for connection..."),t.waitForSocketConnection(e)},100)}},{key:"componentDidMount",value:function(){this.scrollToBottom()}},{key:"componentDidUpdate",value:function(){this.scrollToBottom()}},{key:"componentWillReceiveProps",value:function(e){var t=this;this.props.match.params.chatID!==e.match.params.chatID&&(A.disconnect(),this.waitForSocketConnection(function(){A.fetchMessages(t.props.username,e.match.params.chatID)}),A.connect(e.match.params.chatID))}},{key:"render",value:function(){var e=this;return s.a.createElement("cascasePropsUp",null,s.a.createElement("div",{className:"messages"},s.a.createElement("ul",{id:"chat-log"},this.props.messages&&this.renderMessages(this.props.messages),s.a.createElement("div",{style:{float:"left",clear:"both"},ref:function(t){e.messagesEnd=t}}))),s.a.createElement("div",{className:"message-input"},s.a.createElement("form",{onSubmit:this.sendMessageHandler},s.a.createElement("div",{className:"wrap"},s.a.createElement("input",{onChange:this.messageChangeHandler,value:this.state.message,required:!0,id:"chat-message-input",type:"text",placeholder:"Write your message..."}),s.a.createElement("i",{className:"fa fa-paperclip attachment","aria-hidden":"true"}),s.a.createElement("button",{id:"chat-message-submit",className:"submit"},s.a.createElement("i",{className:"fa fa-paper-plane","aria-hidden":"true"}))))))}}]),t}(s.a.Component),M=Object(i.b)(function(e){return{username:e.auth.username,messages:e.message.messages,conversationID:e.message.conversationID}})(D),N=function(){return s.a.createElement("cascadeProps",null,s.a.createElement(O.a,{exact:!0,path:"/:chatID/",component:M}))},_=a(31),U=a(219),R=a(218),x=a(217),F=a(42),H=a.n(F),L=function(e,t){return{type:"AUTH_SUCCESS",token:t,username:e}},P=function(){return localStorage.removeItem("token"),localStorage.removeItem("username"),localStorage.removeItem("expirationDate"),{type:"AUTH_LOGOUT"}},G=function(e){return function(t){setTimeout(function(){t(P())},1e3*e)}},z=a(223),B=function(e){return s.a.createElement(z.a,{to:"".concat(e.chatURL),style:{color:"#fff"}},s.a.createElement("li",{className:"contact"},s.a.createElement("div",{className:"wrap"},s.a.createElement("span",{className:"contact-status ".concat(e.status)}),console.log("Contact - Status: ",e.status),console.log("Contact - Status: ",e.name),s.a.createElement("div",{className:"meta"},s.a.createElement(I.a,{size:50,icon:"user"}),s.a.createElement("p",{className:"name",style:{"padding-left":"30%",top:"10px"}},e.name)))))},W=s.a.createElement(_.a,{type:"loading",style:{fontSize:24},spin:!0}),J=function(e){function t(){var e,a;Object(E.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(v.a)(this,(e=Object(k.a)(t)).call.apply(e,[this].concat(s)))).state={loginForm:!0},a.changeForm=function(){a.setState({loginForm:!a.state.loginForm})},a.authenticate=function(e){e.preventDefault(),a.state.loginForm&&a.props.login(e.target.username.value,e.target.password.value)},a}return Object(y.a)(t,e),Object(b.a)(t,[{key:"waitForAuthDetails",value:function(){var e=this;setTimeout(function(){null===e.props.token||void 0===e.props.token?(console.log("waiting for authentication details..."),e.waitForAuthDetails()):e.props.getUserChats(e.props.username,e.props.token)},100)}},{key:"componentDidMount",value:function(){this.waitForAuthDetails()}},{key:"render",value:function(){var e=this,t=this.props.username;console.log("Sidepanel - currName",t);var a=this.props.chats.map(function(a){console.log("Sidepanel - Participants",a.participants),console.log("Sidepanel - Current slug",a.id);var n=a.participants[0]!=t?a.participants[0]:a.participants[1];return e.props.parentCallback(n),s.a.createElement(B,{key:a.id,name:n,picURL:"http://website.png",status:"busy",chatURL:"/".concat(a.id)})}),n=s.a.createElement(U.a,null,s.a.createElement(U.a.Item,null,s.a.createElement("a",{onClick:this.props.logout},s.a.createElement(_.a,{type:"logout"})," Log Out")));return s.a.createElement("div",{id:"sidepanel"},s.a.createElement("div",{id:"profile",style:this.props.isAuthenticated?{height:"10%"}:{height:"100%"}},s.a.createElement("div",{className:"wrap"},s.a.createElement("div",{id:"usercard",style:this.props.isAuthenticated?{height:"100%"}:{height:"20%"}},this.props.isAuthenticated?s.a.createElement(R.a,{overlay:n},s.a.createElement("a",{className:"ant-dropdown-link",style:{width:"100%"}},s.a.createElement(I.a,{size:50,icon:"user"}),s.a.createElement("span",{className:"",style:{width:"100%","padding-left":"25%","font-size":"24px","font-weight":"600"}},this.props.username))):s.a.createElement("div",{className:"",style:{"text-align":"center",position:"relative",height:"100%"}},s.a.createElement("h1",{style:{color:"white",position:"absolute",bottom:"0",width:"100%"}},"Messaging System"))),s.a.createElement("div",{id:"expanded",style:this.props.isAuthenticated?{display:"none"}:{height:"80%"}},this.props.loading?s.a.createElement(x.a,{indicator:W}):this.props.isAuthenticated?s.a.createElement("div",{style:{display:"none"}}):s.a.createElement("div",null,s.a.createElement("form",{method:"POST",onSubmit:this.authenticate},this.state.loginForm?s.a.createElement("div",null,s.a.createElement("input",{name:"username",type:"text",placeholder:"username"}),s.a.createElement("input",{name:"password",type:"password",placeholder:"password"})):s.a.createElement("div",{style:{display:"none"}}),s.a.createElement("button",{type:"submit"},"Login")))))),this.props.isAuthenticated?s.a.createElement("div",{id:"contacts",style:{height:"90%","border-top":"1px solid grey"}},s.a.createElement("h3",{style:{"text-align":"center",color:"white"}},"Messages"),s.a.createElement("ul",null,a)):s.a.createElement("div",{style:{display:"none"}}))}}]),t}(s.a.Component),V=Object(i.b)(function(e){return{isAuthenticated:null!==e.auth.token,loading:e.auth.loading,token:e.auth.token,username:e.auth.username,chats:e.message.chats}},function(e){return{login:function(t,a){return e(function(e,t){return function(a){a({type:"AUTH_START"}),H.a.post("".concat(C,"/rest-auth/login/"),{username:e,password:t}).then(function(t){var n=t.data.key,s=new Date((new Date).getTime()+36e5);localStorage.setItem("token",n),localStorage.setItem("username",e),localStorage.setItem("expirationDate",s),a(L(e,n)),a(G(3600))}).catch(function(e){a({type:"AUTH_FAIL",error:e})})}}(t,a))},logout:function(){return e(P())},getUserChats:function(t,a){return e(function(e,t){return function(a){H.a.defaults.xsrfHeaderName="X-CSRFTOKEN",H.a.defaults.xsrfCookieName="csrftoken",H.a.defaults.headers={"Content-Type":"application/json",Authorization:"Token ".concat(t)},H.a.get("".concat(C,"/chat/?username=").concat(e)).then(function(e){return a({type:"GET_CHATS_SUCCESS",chats:e.data})})}}(t,a))}}})(J),X=a(221),q=function(e){function t(){return Object(E.a)(this,t),Object(v.a)(this,Object(k.a)(t).apply(this,arguments))}return Object(y.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){return null===this.props.token?s.a.createElement(X.a,{to:"/"}):s.a.createElement("div",{className:"contact-profile"},null!==this.props.username?s.a.createElement("cascasePropsUp",null,s.a.createElement("p",{style:{width:"100%","text-align":"center"}},this.props.selectedChat),s.a.createElement("div",{className:"social-media"})):null)}}]),t}(s.a.Component),K=Object(i.b)(function(e){return{username:e.auth.username,token:e.auth.token}})(q),Q=(a(212),a(220)),Y=(Q.a.Header,Q.a.Content),Z=Q.a.Sider,$=function(e){function t(e){var a;return Object(E.a)(this,t),(a=Object(v.a)(this,Object(k.a)(t).call(this,e))).state={selectedMessage:""},a.callbackFunction=function(e){a.setState({selectedMessage:e})},A.addCallbacks(a.props.setMessages.bind(Object(S.a)(Object(S.a)(a))),a.props.addMessage.bind(Object(S.a)(Object(S.a)(a)))),a}return Object(y.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){this.props.autoSignIn()}}]),Object(b.a)(t,[{key:"render",value:function(){return s.a.createElement(w.a,null,s.a.createElement("div",{id:"frame"},s.a.createElement(Q.a,null,s.a.createElement(Z,{width:this.props.authenticated?"30%":"100%"},s.a.createElement(V,{parentCallback:this.callbackFunction})),s.a.createElement(Y,{width:this.props.authenticated?"70%":"0%"},s.a.createElement("div",{className:"content"},s.a.createElement(K,{selectedChat:this.state.selectedMessage}),console.log("App - Profile - parentCallback: ",this.state.selectedMessage),s.a.createElement(N,null))))))}}]),t}(s.a.Component),ee=Object(i.b)(function(e){return{authenticated:e.auth.token}},function(e){return{autoSignIn:function(){return e(function(e){var t=localStorage.getItem("token"),a=localStorage.getItem("username");if(void 0===t)e(P());else{var n=new Date(localStorage.getItem("expirationDate"));n<=new Date?e(P()):(e(L(a,t)),e(G((n.getTime()-(new Date).getTime())/1e3)))}})},addMessage:function(t){return e(function(e){return{type:"ADD_MESSAGE",message:e}}(t))},setMessages:function(t){return e(function(e){return{type:"SET_MESSAGES",messages:e}}(t))}}})($),te=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||r.d;var ae=function(){var e=Object(r.c)({auth:h,message:f});return Object(r.e)(e,te(Object(r.a)(l.a)))}(),ne=s.a.createElement(i.a,{store:ae},s.a.createElement(ee,null));c.a.render(ne,document.getElementById("app"))}},[[120,2,1]]]);
//# sourceMappingURL=main.028e01b6.chunk.js.map