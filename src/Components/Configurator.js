import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import "@google/model-viewer/dist/model-viewer";
import Logo from "./test.gltf";
import metal01 from "./img/metal01.jpg";
import metal02 from "./img/metal02.jpg";
import metal03 from "./img/metal03.jpg";
import pillow01 from "./img/pillow01.jpg";
import pillow02 from "./img/pillow02.jpg";
import pillow03 from "./img/pillow03.jpg";
import wood01 from "./img/wood01.jpg";
import wood02 from "./img/wood02.jpg";
import wood03 from "./img/wood03.jpg";
// TEST START
// import { useEffect } from "react";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// TEST END

function Configurator() {
  const modelPath = Logo;
  var gltfModel;
  var activeOption;

  // TEST START
  // const scene = new THREE.Scene();

  // const camera = new THREE.PerspectiveCamera(
  //   45,
  //   window.innerWidth / window.innerHeight,
  //   1,
  //   10000
  // );
  // camera.position.set(0, 0, 2);

  // const renderer = new THREE.WebGLRenderer();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // useEffect(() => {
  //   document.body.appendChild(renderer.domElement);
  //   // eslint-disable-next-line
  // }, []);

  // const ambientLight = new THREE.AmbientLight(0xffffff);
  // scene.add(ambientLight);
  // TEST END

  const materials = [
    {
      texture: metal01,
      size: [6, 6, 6],
      shininess: 60,
    },
    {
      texture: metal02,
      size: [6, 6, 6],
      shininess: 60,
    },
    {
      texture: metal03,
      size: [6, 6, 6],
      shininess: 60,
    },
    {
      texture: pillow01,
      size: [6, 6, 6],
      shininess: 60,
    },
    {
      texture: pillow02,
      size: [6, 6, 6],
      shininess: 60,
    },
    {
      texture: pillow03,
      size: [6, 6, 6],
      shininess: 60,
    },
    {
      texture: wood01,
      size: [6, 6, 6],
      shininess: 60,
    },
    {
      texture: wood02,
      size: [6, 6, 6],
      shininess: 60,
    },
    {
      texture: wood03,
      size: [6, 6, 6],
      shininess: 60,
    },
  ];

  let txt1 = new THREE.TextureLoader().load(metal01);
  txt1.repeat.set([6], [6], [6]);
  txt1.wrapS = THREE.RepeatWrapping;
  txt1.wrapT = THREE.RepeatWrapping;

  const initialMaterial1 = new THREE.MeshStandardMaterial({
    map: txt1,
  });

  let txt2 = new THREE.TextureLoader().load(pillow01);

  txt2.repeat.set([6], [6], [6]);
  txt2.wrapS = THREE.RepeatWrapping;
  txt2.wrapT = THREE.RepeatWrapping;

  const initialMaterial2 = new THREE.MeshStandardMaterial({
    map: txt2,
  });

  let txt3 = new THREE.TextureLoader().load(wood01);

  txt3.repeat.set([6], [6], [6]);
  txt3.wrapS = THREE.RepeatWrapping;
  txt3.wrapT = THREE.RepeatWrapping;

  const initialMaterial3 = new THREE.MeshStandardMaterial({
    map: txt3,
  });

  const initialMap = [
    { materialType: "Metal", initialMaterial: initialMaterial1 },
    { materialType: "Pillow", initialMaterial: initialMaterial2 },
    { materialType: "Wood", initialMaterial: initialMaterial3 },
  ];

  var loader = new GLTFLoader();

  loader.load(
    modelPath,
    function (gltf) {
      gltfModel = gltf.scene;
      // theModel.traverse((object) => {
      //   console.log(object);
      //   if (object.isMesh) {
      //     console.log(object.isMesh);
      //     object.castShadow = true;
      //     object.receiveShadow = true;
      //   }
      // });

      gltfModel.rotation.y = 3;

      gltfModel.position.y = 0;

      for (let objects of initialMap) {
        gltfModel.traverse((model) => {
          if (model.isMesh) {
            if (model.name.includes(objects.materialType)) {
              model.material = objects.initialMaterial;
              model.nameID = objects.materialType; // Set a new property to identify this object
            }
          }
        });
      }
      // TEST START
      // scene.add(gltf.scene);
      // TEST END
      exportGLTF();
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  // const [allButtons, setAllButtons] = useState(null);

  // useEffect(() => {
  //   setAllButtons(
  //     document.querySelectorAll(".customizer-group .customizer-item")
  //   );
  // }, []);

  function elementReady(selector) {
    return new Promise((resolve, reject) => {
      let element = document.querySelector(selector);
      if (element) {
        // console.log(element);
        resolve(element);
      }

      new MutationObserver((mutationRecords, observer) => {
        // Query for elements matching the specified selector
        Array.from(document.querySelectorAll(selector)).forEach((button) => {
          button.addEventListener("click", (event) => {
            Array.from(
              event.currentTarget.parentNode.querySelectorAll(selector)
            ).forEach((button) => {
              button.classList.remove("active");
            });
            button.classList.add("active");
            activeOption = event.currentTarget.dataset.option;
            selectOption();
            resolve(button);
          });
          //Once we have resolved we don't need the observer anymore.
          observer.disconnect();
        });
      }).observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
    });
  }

  elementReady(".customizer-group .customizer-item");

  // const checkElement = async (selector) => {
  //   while (document.querySelector(selector) === null) {
  //     await new Promise((resolve) => requestAnimationFrame(resolve));
  //   }
  //   return document.querySelector(selector);
  // };

  // checkElement(".customizer-group .customizer-item").then((solo) => {
  //   Array.from(solo).forEach((button) => {
  //     button.addEventListener("click", (event) => {
  //       button.classList.remove("active");
  //       event.currentTarget.classList.add("active");
  //       activeOption = event.currentTarget.dataset.option;
  //       selectOption();
  //       selectOption();
  //     });
  //   });
  // });

  function selectOption(e) {
    if (activeOption === "Metal1") {
      activeOption = "Metal";
      selectSwatch(0);
    }
    if (activeOption === "Metal2") {
      activeOption = "Metal";
      selectSwatch(1);
    }
    if (activeOption === "Metal3") {
      activeOption = "Metal";
      selectSwatch(2);
    }

    if (activeOption === "Pillow1") {
      activeOption = "Pillow";
      selectSwatch(3);
    }

    if (activeOption === "Pillow2") {
      activeOption = "Pillow";
      selectSwatch(4);
    }

    if (activeOption === "Pillow3") {
      activeOption = "Pillow";
      selectSwatch(5);
    }

    if (activeOption === "Wood1") {
      activeOption = "Wood";
      selectSwatch(6);
    }

    if (activeOption === "Wood2") {
      activeOption = "Wood";
      selectSwatch(7);
    }

    if (activeOption === "Wood3") {
      activeOption = "Wood";
      selectSwatch(8);
    }
  }

  // const swatches = document.querySelectorAll(".tray__swatch");

  // for (const swatch of swatches) {
  //   swatch.addEventListener("click", selectSwatch);
  // }

  function selectSwatch(swatchNumber) {
    let material = materials[swatchNumber];

    // let texture = new THREE.TextureLoader().load(material.texture);
    let texture = new THREE.TextureLoader().load(material.texture, exportGLTF);
    // let texture = new THREE.TextureLoader().load(material.texture);

    texture.repeat.set(material.size[0], material.size[1], material.size[2]);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    const new_mtl = new THREE.MeshStandardMaterial({
      map: texture,
    });

    setMaterial(activeOption, new_mtl);
  }

  function setMaterial(type, material) {
    gltfModel.traverse((object) => {
      if (object.isMesh && object.nameID != null) {
        if (object.nameID === type) {
          object.material = material;
        }
      }
    });
  }

  function exportGLTF() {
    var gltfExporter = new GLTFExporter();
    gltfExporter.parse(gltfModel, function (result) {
      let output = JSON.stringify(result, null, 2);
      let blob = new Blob([output], { type: "application/json" });
      let myBlob = URL.createObjectURL(blob);
      document.getElementById("viewer3").src = myBlob;

      var reader = new FileReader();

      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        // var base64data = reader.result;
        // console.log("base64data: " + base64data);
      };
    });
  }

  // TEST START
  // const controls = new OrbitControls(camera, renderer.domElement);

  // function animate() {
  //   requestAnimationFrame(animate);
  //   controls.update();
  //   renderer.render(scene, camera);
  // }
  // animate();
  // TEST END

  return <div></div>;
}

export default Configurator;
