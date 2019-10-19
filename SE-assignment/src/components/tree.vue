<template>
  <div id="tree-box">
</div>
</template>
<style>
</style>
<script>
import G6 from "@antv/g6";
export default {
  data() {
    return {
      
    };
  },
  computed: {
    
  },
  mounted(){
    let fa=document.getElementById("tree-box");

    let data=JSON.parse(this.$route.query.data);
    for(var i=0;i<data.length;++i){
      var container=document.createElement("div");
      container.style.width="1000px";
      container.style.height="800px"; 
      var box=document.createElement("div");
      box.id="tree"+i
      container.appendChild(box)
      fa.appendChild(container)
      this.initG6(data[i],"tree"+i);
    }
  },
  methods: {
    initG6(data,name) {
      const graph = new G6.TreeGraph({
        container: name,
        width: window.innerWidth,
        height: window.innerHeight,
        center:[1000,100],
       
        modes: {
          default: [
            {
              type: "collapse-expand" 
            },
            "drag-canvas",
            "zoom-canvas"
          ]
        },
        layout: {
          type:"dendrogram",
          direction: "LR", 
          nodeSep: 50,
          rankSep: 150
        },
        defaultNode: {
          size: 10,
          anchorPoints: [[0, 0.5], [1, 0.5]],
          style: {
            fill: "#40a9ff",
            stroke: "#096dd9"
          }
        },
        defaultEdge: {
          shape: "cubic-horizontal",
          style: {
            stroke: "break"
          }
        }
      });
       graph.on('node:contextmenu', e=> {
         let name=e.item._cfg.model.label;
         if(name.indexOf("博士生")!=-1||name.indexOf("硕士生")!=-1||name.indexOf("本科生")!=-1||name.indexOf("级")!=-1)return;
    else{
    alert("姓名:"+name+"\n获奖情况：。。。。。。"+"\n联系方式：。。。。。。");
    }
  });
      graph.node(function(node) {
        return {
          size: 20,
          style: {
            fill: "purple",
            stroke: "#096dd9"
          },
          label: node.name,
          labelCfg: {
            style: {
              fontSize: 16
            },
            position:
              node.children && node.children.length > 0 ? "left" : "right"
          }
        };
      });
      graph.edge(function(edge) {
        return {
          shape: "cubic-horizontal",
          color: "#A3B1BF"
          // label: edge.target._cfg.model.name
        };
      });
    graph.data(data);
    graph.render();
    graph.fitView();
    }
  }
  
};
</script>
