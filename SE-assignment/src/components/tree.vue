<template>
  <div id="tree-box">
</div>
  
</template>
<style>
  .g6-tooltip {
    display: none;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 8px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20px 10px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
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
            {
        type: 'tooltip',
        formatText: function formatText(model) {
          return model.label;
        }
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
       function clearAllStats() {
    graph.setAutoPaint(false);
    graph.getNodes().forEach(function(node) {
      graph.clearItemStates(node);
    });
    graph.getEdges().forEach(function(edge) {
      graph.clearItemStates(edge);
    });
    graph.paint();
    graph.setAutoPaint(true);
  }
       graph.on('node:mouseenter', e=> {
         let name=e.item._cfg.model.label;
         
         if(name.indexOf("博士生")!=-1||name.indexOf("硕士生")!=-1||name.indexOf("本科生")!=-1||name.indexOf("级")!=-1)return;
    else{
    graph.paint();
    graph.setAutoPaint(true);
    }
  });
   graph.on('node:mouseleave', clearAllStats);
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
