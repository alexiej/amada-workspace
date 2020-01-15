import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VuePageTransition from 'vue-page-transition'
import Notifications from 'vue-notification'

Vue.config.productionTip = false
Vue.use(VuePageTransition)
Vue.use(Notifications)

// MILESTONE 01
// DONE: Create open file, close file, save file
// DONE: 01  Save file to a destination, when it is not a file.
// DONE: 02 - Create Open File
// DONE: 04 -  About Page should be about page
// DONE: 02b - State working, when we are on the files,
// DONE :03 - Create Open Example file, to check what it is,
// TODO: 04 - Create left bar for current open file (KONSPEKT)
// TODO: 05 - Create open files left bar, when it's open (FILE REQUIREMENTS)
// TODO: 06 - https://github.com/rchrd2/example-electron-file-association/blob/master/index.js#L40
// DONE: 07 - Drag & Drop
// DONE: 08 - fix organization of files
// TODO: 08 - UPDATE README.MD

// BLOCKS - BETTER
// TODO: 01 - Links - go to the new page
// TODO: 04 - headers should have better format (align to left)
// TODO: 05 - code - should prepare correct style (!)

// TODO: 02 - images - insert images
// TODO: 03 - Headers should treat like headers (# create header)

// FEATURES - MILESTONE
// Synchronize with Online Database
// Create Workspace
// Create Folders in your workspace for your work
// Blocks
//    - Correct Coding Box
//    - Insert Image Icon from file
//    - Paste Clipboard
//    - Shortcuts
//    - Blocks like Markdown commands (# HEADE), create header, ``` - creates code, etc..bundleRenderer.renderToStream
// Export to .md
// Export to .pdf

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
