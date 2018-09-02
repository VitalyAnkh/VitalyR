<template>
  <div id="home">
      <main>
        <div id="container">
          <div id="center">
              <div id="header">
                <li  ><a href="/a/home/best" >Best</a></li>
                <li  ><a href="/" >All</a></li>
                <span v-for="(category, index) in categorys" :key="index">
                    <li v-if="category.category_name != 'office'">
                      <a :href="'/a/home/' + category.category_name" >{{ category.category_name }}</a>
                    </li>
                </span>
                <li  ><a href="/a/home/care" >Noreply</a></li>
              </div>
              <div id="content">
                      <div id="items" v-for="(theme, index) in theme_list" :key="index">
                            <div id="office" v-if="theme.category_name === 'Office'">
                                <div id="office-title">
                                  <a :href="'/a/'+ theme.category_name + '/theme/' + theme.id" title="theme.title"> {{ theme.title }} </a>
                                </div>
                                <div id="detail">
                                    <span id="info" class="col-name">{{ theme.category_name }}</span>
                                    <span id="info"><a :href="'/a/user/' + theme.user_id">{{ theme.username }}</a></span>
                                    <span id="info"><a :href="'/a/'+ theme.category_name + '/theme/' + theme.id">{{ theme.comment_count }}</a></span>
                                    <span id="info">{{ theme.view_count }}</span>
                                    <span id="info"> {{ theme.rtime }} </span>
                                </div> 
                            </div>
                            <div id="item" v-if="theme.category_name !== 'Office'">
                                <div id="item-title">
                                  <a :href="'/a/'+ theme.category_name + '/theme/' + theme.id" title="theme.title"> {{ theme.title }} </a>
                                </div>
                                <div id="detail">
                                    <span id="info" class="col-name">{{ theme.category_name }}</span>
                                    <span id="info"><a :href="'/a/user/' + theme.user_id">{{ theme.username }}</a></span>
                                    <span id="info"><a :href="'/a/'+ theme.category_name + '/theme/' + theme.id">{{ theme.comment_count }}</a></span>
                                    <span id="info">{{ theme.view_count }}</span>
                                    <span id="info"> {{ theme.rtime }} </span>
                                </div>
                            </div>
                      </div>
              </div>
              <div >
                      <ul id="pagination">
                            <li id="one" > <a href="/">1</a></li>
                            <li v-if="page_count > 2"> <a href="/a/home/page/2">2</a></li>

                            <li >••</li>

                            <li v-if="(half_count - 3) > 2" ><a :href="'/a/home/page/' + (half_count - 3)">{{ half_count - 3 }}</a></li>
                            <li v-if="half_count > 2" ><a :href="'/a/home/page/' + half_count" >{{ half_count }}</a></li>
                            <li v-if="(half_count + 3) < page_count" ><a :href="'/a/home/page/' + (half_count + 3)" >{{ half_count + 3 }}</a></li>

                            <li >••</li>

                            <li ><a :href="'/a/home/page/' + page_count">{{ page_count }}</a></li>  
                        </ul>       
              </div>
          </div>
          <div id="rightside">
              <div id="bestside">
                  <div id="show">
                    <h3>BestPerson</h3>
                    <div id="title">
                      <li><h5>NewBest</h5></li><li>&emsp;<strong>|</strong>&emsp;</li><li><h5>AllBest</h5></li>
                    </div>
                    <ul>
                      <div id="bestperson" v-for="(new_person,index) in new_best" :key="index">
                        <li>{{new_person}}</li><li>&emsp;<strong>|</strong>&emsp;</li><li>{{all_best[index]}}</li>
                      </div>
                    </ul>
                </div>
              </div>
              <div id="ouisrc_info">
                <h3>OUISRC</h3>
                  <li>User:{{ouisrc_info[0]}}</li>
                  <li>Theme:{{ouisrc_info[1]}}</li>
                  <li>Blog:{{ouisrc_info[2]}}</li>
                  <li>Comment:{{ouisrc_info[3]}}</li>
                  <li>Save:{{ouisrc_info[4]}}</li>
              </div>
              <side></side>
          </div>
          <gotop></gotop>
        </div>
      </main>
  </div>
</template>

<script>
/* eslint-disable */
import URLprefix from '../../config'
import Side from '../../components/side/Side'
import Gotop from '../../components/gotop/Gotop'
import BestSide from '../../components/bestside/BestSide'
export default {
  name: 'home',
  components: {
    "side": Side,
    "gotop": Gotop,
    "bestside": BestSide
  },
  data: function() {
    return {
      theme_list: '',
      page_count: '',
      categorys: '',
      half_count:'',
      new_best: '',
      all_best: '',
      ouisrc_info: ''
    }
  },
  mounted: function() {
             let data = { page_id: 1}
             fetch(URLprefix + 'api/theme_list/page_id',{
                 body: JSON.stringify(data), 
                 headers: {
                    'content-type': 'application/json'
                  },
                  method: 'POST',
                  mode: 'cors'
              }).then(response => response.json())
              .then(json => {
                  this.page_count = json.theme_page_count
                  this.half_count = Math.ceil(json.theme_page_count/2)
                  this.theme_list = json.theme_list
                  this.categorys = json.categorys
              })
              .catch((e) => {
                console.log(e)
              })  

              fetch(URLprefix + "api/home/bestperson",{
                  method: 'GET',
                  mode: 'cors'
              }).then(response => response.json())
              .then(json => {
                  this.new_best = json.new_best
                  this.all_best = json.all_best
              })
              .catch((e) => {
                console.log(e)
              })    

              fetch(URLprefix + 'api/ouisrc/info',{
                  method: 'GET',
                  mode: 'cors'
              }).then(response => response.json())
              .then(json => {
                  json.ouisrc_info[0] = json.ouisrc_info[0]
                   this.ouisrc_info = json.ouisrc_info
              })
              .catch((e) => {
                console.log(e)
              })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#center {
  background-color: #FFFFFF;
}
#header {
  padding: 0.8rem 0.3rem;
  box-shadow: 0 0 3px rgba(0,0,0,0.1), 0 -1px 1px rgba(0,0,0,0.1);
}
#header li {
  display: inline-block;
  color: #0d8575;
  font-weight: bold;
  margin-right: 1rem;
  font-size: 1.2rem;
}
#center #items #office, #center #items #item {
  border-bottom: 1px solid #f3e1f8;
}
#center #office #office-title {
  color: #b93bf3;
  font-weight: bold;
}
#center #item #item-title a {
  color: #0541af;
}
#center #content #items #detail {
  margin-top: 0.3rem;
}
#center #items #detail .col-name {
    color: #f16bf1;
}
#center #items #detail a {
  color: #0541af;
}
#center #content #detail #info {
  padding-right: 0.8rem;
  font-size: 0.7rem;
}
#center #pagination li {
  display: inline; 
  border: 1px solid #cfd9ee;
  padding: 0.33rem;
  vertical-align: middle;
  line-height: 2.2rem;
}
#center #pagination #one{
  border: 1px solid #5bb383;
  margin-left: 0.4vw;
}
#center #pagination a{
  color: #0541af;
  font-weight: bold;
}
#container #rightside #bestside #show h3 {
    padding: 0.5rem;
    text-align: center;
    border-bottom: 2px solid #acc;
}
#container #rightside #bestside #show #title, #container #rightside #bestside #show ul {
    line-height: 2rem;
    text-align: center;
}
#container #rightside #bestside #show #title {
    border-bottom: 2px solid rgb(206, 209, 209);
}
#container #rightside #bestside #show li {
    display: inline-block;
}
#container #rightside #bestside #show ul li {
    font-size: 1.1rem;
    color: green;
}
#bestside, #ouisrc_info {
  padding: 0.1rem;
  background-color: #FFFFFF;
  box-shadow: 0 0 3px rgba(0,0,0,0.1), 0 -1px 1px rgba(0,0,0,0.1);
  margin-bottom: 0.5rem;
}
#container #rightside #ouisrc_info  {
  text-align: center;
}
#container #rightside #ouisrc_info h3 {
  padding: 0.5rem 0;
  border-bottom: 2px solid #acc;
}
#container #rightside #ouisrc_info li {
  padding-top: 0.4rem;
}
@media only screen and (max-width: 600px) {
    main{
        margin: 1vh auto;
        width: 97%;
    }
    #center #items #office, #center #items #item {
        padding: 0.3rem;
    }
    #center #items #office #detail #more, #center #items #item #detail #more {
      display: none;
    }
    #container #rightside{
      margin-top: 1rem;
    }
}
@media only screen and (min-width: 600px) and (max-width: 850px) {
    main{
        margin: 0 auto;
        width: 80%;
        padding-top: 77px;
    }
    #container {
      display: flex;
      flex-flow: row;
    }
    #container #center {
        width: 90%;
        margin-right: 1vw;
    }
    #container #rightside {
        flex: 1;
    }
    #center #items #office, #center #items #item {
        padding: 0.4rem;
    }
}
@media only screen and (min-width: 850px) {
    main {
        margin: 0 auto;
        width: 72%;
        padding-top: 77px;
    }
    #container {
      display: flex;
      flex-flow: row;
    }
    #container #center {
        width: 80%;
        margin-right: 1vw;
    }
    #container #rightside {
        flex: 1;
    }
    #center #items #office, #center #items #item {
      padding: 0.4rem;
    }
    #center #items #office #office-title, #center #items #item #item-title {
      font-size: 1.1rem;
    }
}
</style>