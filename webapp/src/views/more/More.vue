<template>
    <div id="help">
        <main>
            <div id="content">
                <div id="support">
                    <div id="ouisrc">
                        <span style="font-size: 1.6rem;">OUISRC : </span>
                        <span style="font-size: 1.2rem;">A fullstack community for developers</span>
                    </div><br>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
/* eslint-disable */
import URLprefix from '../../config'
export default {
    name: 'help'
}
</script>

<style scoped>
a {
  color: #0541af;
}
main #ouisrc {
    padding-top: 1rem;
    color: #b93bf3;
    font-weight: bold;
}
@media only screen and (max-width: 600px) {
    main  {
      margin: 0 auto;
      width: 90%;
    }
}
@media only screen and (min-width: 600px) and (max-width: 850px) {
    main{
        margin: 0 auto;
        width: 80%;
        padding-top: 77px;
    }
}
@media only screen and (min-width: 850px) {
    main {
        margin: 0 auto;
        width: 72%;
        padding-top: 77px;
    }
}
</style>
