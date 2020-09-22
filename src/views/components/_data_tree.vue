<template>
  <div>
    <nav class="nav">
      <ul class="list">
        <li>
          <span>APP TITLE FOR MTATE</span>
          <ul>
            <li>
              <span>Lab</span>
              <ul>
                <li>
                  <span>Graph</span>
                  <ul>
                    <li>
                      <span>Image</span>
                    </li>
                    <li>
                      <span>Design</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <span>Blog</span>
              <ul>
                <li>
                  <span>Category</span>
                  <ul>
                    <li>
                      <span>Code</span>
                    </li>
                    <li>
                      <span>Graph</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: '_data_tree',
  props: {
    level: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.nav {
  margin: 20px auto;
  left: 60px;
  width: 455px;
  min-height: auto;
}

ul.list,
ul.list ul {
  margin: 0;
  padding: 0;
  list-style-type: none;

}

ul.list ul {
  position: relative;
  margin-left: 10px;
}

ul.list ul:before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 0;

  border-left: 1px solid #ccc;
}

ul.list li {
  position: relative;
  margin: 0;
  padding: 9px 36px;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: normal;
  line-height: 20px;
}

ul.list li span {
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
}

ul.list ul li:before {
  content: "";
  display: block;
  position: absolute;
  top: 20px;
  left: 0;
  width: 28px;
  height: 0;
  border-top: 1px solid #ccc;
}


</style>
