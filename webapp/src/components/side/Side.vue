<template>
    <div id="side">
        <main>
            <div id="title">
                <span style="font-size: 1.5rem;">OUISRC</span>
                <span style="font-size: 1.2rem;">全栈社区</span>
            </div>
            <div id="line"></div>
            <p><span style="color:fuchsia;font-weight:bold;">支持OUISRC：</span>这是社区项目,希望大家共同参与,谢谢！</span></p>
            <p>本站<a href="https://github.com/OUISRC/kary" target="_blank"><strong>源码</strong></a>开源.</p>
        </main>
    </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'side'
}
</script>

<style scoped>
main{
    background-color: #ffffff;
    box-shadow: 0 0 3px rgba(0,0,0,0.1), 0 -1px 1px rgba(0,0,0,0.1);
}
main a {
    color: #0541af;
}
main #title {
    padding-top: 0.3rem;
    color:fuchsia; 
    font-weight:bold;
}
main #line {
    border: 1px solid #acc;
}
main p {
    margin: 0 auto;
    width: 10rem;
}
@media only screen and (max-width: 600px) {
    main #title {
        text-align: center;
    }
}
@media only screen and (min-width: 600px) and (max-width: 850px) {
    main #title {
        margin: 0 auto;
        width: 11rem;
    }
}
@media only screen and (min-width: 850px) {
    main #title {
        margin: 0 auto;
        width: 11rem;
    }
}
</style>