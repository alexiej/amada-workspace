<template lang="pug">
  #about.content
    img#logo(src='../assets/logo.png',width=200,height=200)
    h1 About
    h2 Information about Amada Workspace
    p Amada Workspace is a free Open Source Software Licenced under MIT standard licence
    h2 Packages Uses
    <div>Icons made by <a target="_blank" href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank">www.flaticon.com</a></div>
    a(href="https://fontawesome.com/start",target="_blank") Font Awesome
    h2 Licence
    p.
      MIT License
    p.
      Copyright (c) 2019 AMADA Workspace
    p.
      Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the "Software"), to deal
      in the Software without restriction, including without limitation the rights
      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      copies of the Software, and to permit persons to whom the Software is
      furnished to do so, subject to the following conditions:
    p.
      The above copyright notice and this permission notice shall be included in all
      copies or substantial portions of the Software.
    p.
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
</template>
<style lang="scss">
#about {
  text-align: center;
  margin: 4rem;

  img#logo {
    margin:auto;
    margin-bottom: 2rem;
  }

  p {
    padding: 1rem;
    color: $grey;
  }

}
</style>
