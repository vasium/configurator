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
import { useEffect, useRef, useState } from "react";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// TEST END
import { IMAGES } from "./Images";

function Configurator() {
  const modelPath = Logo;
  var gltfScene;
  var activeOption;

  // const metal01 = useRef(null);
  // const metal02 = useRef(null);
  // const metal03 = useRef(null);
  // const pillow01 = useRef(null);
  // const pillow02 = useRef(null);
  // const pillow03 = useRef(null);
  // const wood01 = useRef(null);
  // const wood02 = useRef(null);
  // const wood03 = useRef(null);

  ///images loader
  const [imgsLoaded, setImgsLoaded] = useState(false);

  useEffect(() => {
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image.url;
        // wait 2 seconds to simulate loading time
        loadImg.onload = () =>
          // setTimeout(() => {
          resolve(image.url);
        // }, 2000);

        loadImg.onerror = (err) => reject(err);
      });
    };

    Promise.all(IMAGES.map((image) => loadImage(image)))
      .then(() => setImgsLoaded(true))
      .catch((err) => console.log("Failed to load images", err));
  }, []);

  // console.log("metal02", metal01.current);
  ///images loader

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
    // {
    //   color: "438AAC",
    // },
    // {
    //   color: "000000",
    // },
  ];

  let txt1 = new THREE.TextureLoader().load(metal01);
  txt1.repeat.set([6], [6], [6]);
  txt1.wrapS = THREE.RepeatWrapping;
  txt1.wrapT = THREE.RepeatWrapping;

  const initialMaterial1 = new THREE.MeshStandardMaterial({
    // color: 0xbfff00,
    map: txt1,
  });

  let txt2 = new THREE.TextureLoader().load(pillow01);

  txt2.repeat.set([6], [6], [6]);
  txt2.wrapS = THREE.RepeatWrapping;
  txt2.wrapT = THREE.RepeatWrapping;

  const initialMaterial2 = new THREE.MeshStandardMaterial({
    // color: 0x000000,
    map: txt2,
  });

  let txt3 = new THREE.TextureLoader().load(wood01);

  txt3.repeat.set([6], [6], [6]);
  txt3.wrapS = THREE.RepeatWrapping;
  txt3.wrapT = THREE.RepeatWrapping;

  const initialMaterial3 = new THREE.MeshStandardMaterial({
    // color: 0x000000,
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
      gltfScene = gltf.scene;
      // theModel.traverse((object) => {
      //   console.log(object);
      //   if (object.isMesh) {
      //     console.log(object.isMesh);
      //     object.castShadow = true;
      //     object.receiveShadow = true;
      //   }
      // });

      gltfScene.rotation.y = 3;

      gltfScene.position.y = 0;

      for (let objects of initialMap) {
        gltfScene.traverse((model) => {
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
            console.log("activeOption", activeOption);
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

  function selectOption() {
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
    console.log("material.texture", material.texture);
    let texture = new THREE.TextureLoader().load(material.texture, exportGLTF);
    // let texture = new THREE.TextureLoader().load(material.texture);

    texture.repeat.set(material.size[0], material.size[1], material.size[2]);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    const newMaterial = new THREE.MeshStandardMaterial({
      map: texture,
    });

    setMaterial(activeOption, newMaterial);
  }

  /////

  // function selectSwatch(e) {
  //   let color = colors[e];
  //   let newMaterial;

  //   let txt = new THREE.TextureLoader().load(color.texture, exportGLTF);
  //   txt.repeat.set(color.size[0], color.size[1], color.size[2]);
  //   txt.wrapS = THREE.RepeatWrapping;
  //   txt.wrapT = THREE.RepeatWrapping;
  //   newMaterial = new THREE.MeshPhongMaterial({
  //     map: txt,
  //     shininess: color.shininess ? color.shininess : 10,
  //   });
  //   console.log("Color: " + color.color);

  //   console.log(newMaterial);
  //   console.log(theModel);
  //   console.log(activeOption);
  //   console.log("Active" + newMaterial);

  //   setMaterial(theModel, activeOption, newMaterial);
  // }

  /////

  function setMaterial(type, material) {
    gltfScene.traverse((object) => {
      if (object.isMesh && object.nameID != null) {
        if (object.nameID === type) {
          object.material = material;
        }
      }
    });
  }

  var gltfExporter = new GLTFExporter();

  function exportGLTF() {
    console.log(gltfScene);
    console.log(imgsLoaded);
    // if (imgsLoaded) {
    // console.log("dddd", metal01.current);
    // console.log("dddd", metal02.current);
    // console.log("dddd", metal03.current);
    // console.log("dddd", pillow01.current);
    // console.log("dddd", pillow02.current);
    // console.log("dddd", pillow03.current);
    // console.log("dddd", wood01.current);
    // console.log("dddd", wood02.current);
    // console.log("dddd", wood03.current);

    gltfExporter.parse(gltfScene, function (gltf) {
      // console.log(imgsLoaded);
      // console.log(gltf);

      // console.log("result1", gltf);

      // if (gltf) {
      //   console.log("result2", gltf);

      let output = JSON.stringify(gltf, null, 2);
      // if (output) {
      //   console.log("output");
      let blob = new Blob([output], { type: "application/json" });
      // if (blob) {
      //   console.log("blob");
      let myBlob = URL.createObjectURL(blob);

      // if (myBlob) {
      //   console.log("myBlob");
      document.getElementById("viewer").src = myBlob;

      // var reader = new FileReader();
      // reader.readAsDataURL(blob);

      // reader.onloadend = function () {
      //   // var base64data = reader.gltf;
      //   // console.log("base64data: " + base64data);
      // };
      //       }
      //     }
      //   }
      // }
    });
    // }
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
