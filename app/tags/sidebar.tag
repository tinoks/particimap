<sidebar>

  <!-- layout -->
  <h3>{ opts.title }</h3>

  <ul>
    <li each={ item, i in items }>{ item }</li>
  </ul>

  <form onsubmit={ add }>
    <input ref="input">
    <button>Add #{ items.length + 1 }</button>
  </form>

  <!-- style -->
  <style>
    h3 {
      font-size: 14px;
    }
    sidebar{
      position: absolute;
      z-index:999999;
      margin: 0 0 0 20; 
      box-shadow: 0px 0px 20px black; 
      height: calc(100% - 40px);
      height: -moz-calc(100% - 40px);
      height: -webkit-calc(100% - 40px);
      width:260px;
      padding:20px;
      background: white;
      right:-300px;
      transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0px 0px 0px black; 
    }
    sidebar.active {
      right:0;
      box-shadow: 0px 0px 20px black; 
    }
  </style>

  <!-- logic -->
  <script>
    this.items = opts.items || []

    add(e) {
      e.preventDefault()
      var input = this.refs.input
      this.items.push(input.value)
      input.value = ''
    }
  </script>

</sidebar>