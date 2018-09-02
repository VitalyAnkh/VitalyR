<template>
  <div id="signin">
      <div id="content">
          <div id="title">    
            <router-link to="/a/signin">Signin</router-link>&emsp;|&emsp;
            <router-link to="/a/signup">Signup</router-link> 
          </div>
            <input type="text" name="username" placeholder="Username" v-model="Username" />
            <input type="password" name="password" placeholder="Password" v-model="Password" /><br/>
          <div>
              <div id="v_container" style="height: 44px;"></div>
              <input type="text" id="code_input" value="" placeholder="Enter the verification code" style="width: 70%;"/>
              <span><button id="verify" >ClickVerify</button></span>
          </div>
          <button id="submit" @click="signin">Signin</button><br/>
      </div>
  </div>
</template>

<script>
/* eslint-disable */
import URLprefix from '../../config'
import  '../../../static/js/gVerify.js'
import Mnav from '../../components/nav/Mnav'
export default {
  name: 'signin',
  components: {
    "mnav": Mnav
  },
  data () {
    return {
      Username: '',
      Password: ''
    }
  },
  mounted: function() {
    var verifyCode = new GVerify("v_container");
    document.getElementById("verify").onclick = function () {
      var res = verifyCode.validate(document.getElementById("code_input").value);
      if (res) {
        let verify = document.getElementById("verify")
        verify.innerHTML = "VerifyPass"
      } else {
        let verify = document.getElementById("verify")
        verify.innerHTML = "VerifyAgain"
      }
    }
  },
  methods: {
    signin () {
      let uname = this.Username
      let password = this.Password
      let data = { 
          username: uname,
          password: password,
          code: Number.parseInt(0),
      }
      if (document.getElementById("verify").innerHTML == "VerifyPass") {
            fetch(URLprefix + 'user/signin', {
                  body: JSON.stringify(data), 
                  headers: {
                    'content-type': 'application/json'
                  },
                  method: 'POST',
                  mode: 'cors'
              }).then(response => response.json())
              .then(json => {
                    if (json.status == 200) {
                        localStorage.setItem('token',json.token);
                        localStorage.setItem('signin_user',JSON.stringify(json.signin_user));
                        window.location.reload ( true );
                        // setTimeOut("functionName()",2000);
                        this.$router.push('/');
                    }else{
                        alert(json.message)
                    }
              })
              .catch((e) => {
                console.log(e)
              })
      }else{
          alert("Please VerifyPass the verification code then Signin")
      }
              
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#content {
    width: 18rem;
    margin: 0 auto;
    padding-top: 33px;
}
#title {
    text-align: center;
    padding: 0.5rem 0;
    font-size: 1.3rem;
    font-weight: bold;
    background-color:bisque;
}
input[type="text"],
input[type="password"] {
  margin: 6px auto auto;
  width: 18rem;
  height: 36px;
  border: none;
  border-bottom: 1px solid #AAA;
  font-size: 16px;
}
#verify {
  width: 30%; 
  padding: 6px 0;
  font-size: 1rem;
  background-color: bisque;
  border: none;
}
#submit  {
  margin: 6px 0;
  width: 18rem;
  height: 40px;
  background-color:rgb(250, 212, 165);
  border: none;
  border-radius: 2px;
  font-weight: bold;
  font-size: 1.1rem;
}
@media only screen and (min-width: 600px) {
    #content {
      margin: 0 auto;
      padding-top: 100px;
    }
}
</style>