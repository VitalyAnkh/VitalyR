<template>
  <div id="mnav">
    
      <div id="lnav">
        <div id="line"></div>
        <div id="left">
          <a id="front" href="/"><img src="../../../static/imgs/ouisrc.jpg"/></a>
          <a id="name" href="/">OUISRC</a>
          <span id="dlnav">
            <a id="tail" href="#" target="_blank">Docs</a>
            <!-- <a id="tail" href="">search</a> -->
          </span>
        </div>
        <label ><a href="#" id="menu">M</a></label>
      </div>
      <div id="rnav">
          <li v-if="signin_user.username"> 
            <a v-if="messages_count != 0" :href="'/a/user/' + signin_user.id + '/message'" id="mnumber">{{messages_count}}</a>
          </li>
          <li v-if="signin_user.username == 'admin'"> 
            <a href="/a/create" title="create">Create</a>
          </li>
          <li v-if="signin_user.username"> 
            <a href="/a/post" title="post">Post</a>
            <a :href="'/a/user/' + signin_user.id" title="signin_userusername">{{signin_user.username}}</a>
            <a href="/a/signin" title="Logout" @click="logout">Logout</a>
            <a href="/a/more" title="signin">More</a>
          </li>
          <li v-else > 
            <a href="/a/signin" title="signin">Signin</a>
            <a href="/a/signup" title="signin">Signup</a>
            <a href="/a/more" title="signin">More</a>
          </li>
      </div> 
  </div>
</template>

<script>
/* eslint-disable */
import URLprefix from '../../config'
export default {
  name: 'Mnav',
  data: function () {
    return { 
      signin_user: '',
      messages_count:''
    }
  },
  mounted: function() {
      let menu = document.getElementById('menu');
      menu.addEventListener('click', function() {
          let nav = document.getElementById('rnav');
              if (nav.style.height == 'auto') {
                  nav.style.height = '0';
              }else{
                  nav.style.height = 'auto';
              }
      }, false);

      if (localStorage.getItem('signin_user')){
          this.signin_user =  JSON.parse(localStorage.getItem('signin_user'))
          let user_id =  JSON.parse(localStorage.getItem('signin_user')).id
          let data = { user_id: Number.parseInt(user_id)}
          fetch(URLprefix + 'api/user/id/messages',{
                    body: JSON.stringify(data), 
                    headers: {
                      'content-type': 'application/json'
                    },
                    method: 'POST',
                    mode: 'cors'
                }).then(response => response.json())
                .then(json => {
                    this.messages_count = json.messages_count
                })
                .catch((e) => {
                  console.log(e)
                })
      }else{
        return
      }
  },
  methods: {
    logout() {
      if (localStorage.getItem('token')){
          localStorage.removeItem('token')
          localStorage.removeItem('signin_user')
          this.$router.push('/a/signin')
      }else{
        return
      }
    }
  }
}
</script>

<style lang="css" scoped>
a {
  color: inherit;
}
#line {
  position: fixed;
  width: 100%;
  height: 4px;
  background-color: green; 
}
#lnav {
    position: fixed;
    width: 100%;
    line-height: 50px;
    zoom:1;
    display: flex;
    background-color: #ffffff;
    justify-content: space-between;
    /* border-bottom: 1px solid var(--purple); */
    border-bottom: 1px solid #dfdcdc;  
    box-shadow: 0 3px 3px rgba(200, 216, 206, 0.12), 0 3px 3px rgba(97, 107, 100, 0.24);
  }
 #lnav #left #front img {
    width: 2.5rem;
    height: 2.5rem;
    vertical-align:middle;
  }
  #lnav #left #name {
    font-size: 1.8rem;
    margin: auto 1vw;
    font-weight: bold;
    vertical-align:middle;
  }
  #lnav label {
    float: right;
    font-size: 26px;
    font-weight: bold;
    margin: auto 1vw;
  }
  #lnav label a {
    margin-right: 1vw;
  }
  #rnav li #mnumber { 
      font-size: 15px;
      background-color: fuchsia;
      color: gold;
      padding: 0.3rem 0.3rem;
      vertical-align: middle;
    }
@media only screen and (max-width:  600px) {
     #lnav #dlnav #tail {
      font-size: 1.1rem;
      margin-left: 4vw ;
      font-weight: bold;
      vertical-align:middle;
    }
    #lnav #left #front img {
      margin-left: 1vw;
    }
    #lnav #mhome {
      padding-top: 0.2vh;
      font-size: 1.1rem;
      font-weight: bold;
    }
    #rnav {
      padding-top: 3.8rem;
      height: 0;
      display: block;
      overflow: hidden;
    }
    #rnav li #mnumber { 
      padding: 1vh 3vw;
    }
    #rnav li a, #rnav #mlnav a {
      display:block;
      font-size: 1.1rem;
      font-weight: bold;
      border-bottom: 1px solid green;
      padding: 1vh 4vw;
      color: var(--white);
    }
}
@media only screen and (min-width:  600px) and (max-width:  850px) {
    #menu, #mlnav,#mhome {
      display: none;
    }
    #lnav #left #front img {
      margin-left: 3vw;
    }
    #lnav #left #tail {
      margin-left: 3vw;
      font-size: 20px;
      margin: auto 1vw;
      font-weight: bold;
      vertical-align:middle;
    }
    #rnav {
      position: fixed;
      right: 0;
      line-height: 50px;
      padding-right: 3vw;
    }
    #rnav li {
      display: inline-block;
    }
    #rnav li a {
      font-size: 20px;
      font-weight: bold;
      padding-left: 2vw;
    }
}
@media only screen and (min-width:  850px) {
    #menu, #mlnav,#mhome {
      display: none;
    }
    #lnav #left #front img {
      margin-left: 10vw;
    }
    #lnav #left #tail {
      font-size: 20px;
      margin: auto 2vw;
      font-weight: bold;
      vertical-align:middle;
    }
    #rnav {
      position: fixed;
      right: 0;
      line-height: 50px;
      padding-right: 10vw;
    }
    #rnav li {
      display: inline-block;
    }
    #rnav li a {
      font-size: 20px;
      font-weight: bold;
      padding-left: 2vw;
      color: var(--grey);
    }
}
</style>