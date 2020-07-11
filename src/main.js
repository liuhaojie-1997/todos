// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'todomvc-app-css/index.css'
import Vue from 'vue'


// Vue.config.productionTip = false

/* eslint-disable no-new */
var filters = {
  all (todos) {
    return todos;
  },
  active (todos) {
    return todos.filter((todo)=> {
      return !todo.completed;
    });
  },
  completed (todos) {
    return todos.filter((todo)=> {
      return todo.completed;
    });
  }
};

let app =new Vue({
  el: '.todoapp',
  data: {
      msg: 'Welcome to Your Vue.js App',
      title: 'TodoMVC ',
      newTodo: '',
    // todos:JSON.parse(localStorage.getItem('todos')||'[]'),
    todos:'',

    editedTodo:null,
    visibility:'all',

  },
  // watch:{
  //   // 数组的深拷贝
  //   todos:{
  //     handler(newVal,oldVal){
  //       localStorage.setItem('todos',JSON.stringify(newVal))
  //     },
  //     deep:true
  //   },
  // },


  computed:{
    filteredTodos(){
      return filters[this.visibility](this.todos)
    },
    remain(){
      return filters.active(this.todos).length
    },
    allDone:{
      get(){
        return this.remain===0
      },
      set(value){
        return this.todos.forEach((todo)=>{
          todo.completed=value
        })
      }
    }
  },
  methods:{
    addTodo(e){
      // console.log(e.target.value)
      if(!this.newTodo){
        return
      }
      this.todos.push({
        content:this.newTodo,
        completed:false
      })
      this.newTodo=''
    },
    removeTodo(index){
      this.todos.splice(index,1)
    },
    editTodo(todo){
      this.editCache=todo.content
      if(!todo.content){
        return
      }
      this.editedTodo=todo
    },
    doneEdit(todo,index){
      this.editedTodo=null
      if(!todo.content){
        this.removeTodo(index)
      }
    },
    cancelEdit(todo){
      this.editedTodo=null
      todo.content=this.editCache
    },
    clear(){
      this.todos=filters.active(this.todos)
    }
  },
  directives:{
    focus(el,value){
      if(value){
        el.focus()
      }
    }
  }
})

function hashChange() {
  let visibility=location.hash.replace(/#\/?/,'')
  if(filters[visibility]){
    app.visibility=visibility
  }else {
    location.hash=''
    app.visibility='all'
  }
}
window.addEventListener('hashchange', hashChange)
