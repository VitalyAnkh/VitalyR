<template>
 <div id="signup">
   <div id="content">
        <div id="title">    
            <router-link to="/a/signin">Signin</router-link>&emsp;|&emsp;
            <router-link to="/a/signup">Signup</router-link> 
        </div> 
          <input type="text" id="username" name="username" placeholder="Username：within 11 bit，char/number" v-model="Username"  required />
          <input type="email" id="email" name="email" placeholder="Email：Fmt：xxx@xxx.xx" v-model="Email"  required />
          <input type="password" name="password" placeholder="Password：within 11 bit，char/number" v-model="Password"  required/>
          <input type="password" name="confirm_password" placeholder="ConfirmPassword" v-model="ConfirmPassword"  required/><br/>
          
          <input type="submit" id="submit" @click="signup" value="signup"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import URLprefix from '../../config'
import Mnav from '../../components/nav/Mnav'
export default {
  name: 'signup',
  components: {
    "mnav": Mnav
  },
  data () {
    return {
      Username: '',
      Email: '',
      Password: '',
      ConfirmPassword: ''
    }
  },
  methods: {
    signup () {
      var username = this.Username
      var email = this.Email
      var password = this.Password
      var confirm_password = this.ConfirmPassword
      let data = { 
          username: username,
          email: email,
          password: password,
          confirm_password: confirm_password
      }
      let getemail = document.getElementById("email")
      if (username.length == ''){
          alert("username can't be null")
          return
      }else if (username.length > 11){
          alert("Username：within 11 bit，char/number")
          return
      }else if(!getemail.checkValidity()) {
          alert("Please input correct Email format")
          return
      }else if(password == '') {
          alert("password can't be null")
          return
      }else if(password != confirm_password) {
          alert("password isn't same as confirm_password")
          return
      }else{
          fetch(URLprefix + 'user/signup', {
                  body: JSON.stringify(data), 
                  headers: {
                    'content-type': 'application/json'
                  },
                  method: 'POST',
              }).then(response => response.json())
              .then(json => {
                  if (json.status == 200) {
                        localStorage.setItem('token',json.token);
                        localStorage.setItem('signin_user',JSON.stringify(json.signin_user));
                        // window.location.reload ( true ); 
                        this.$router.push('/a/signin')
                    }else{
                        alert(json.message)
                    }
              })
              .catch((e) => {
                console.log(e)
              })
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
input[type="email"],
input[type="password"] {
  margin: 6px auto auto;
  width: 18rem;
  height: 36px;
  border: none;
  border-bottom: 1px solid #AAA;
  font-size: 16px;
}
#submit  {
  margin: 6px 0;
  width: 18rem;
  height: 40px;
  background-color:rgb(248, 211, 166);
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