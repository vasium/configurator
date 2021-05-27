import "./Main.css";

function Main() {
  async function run() {
    async function onReadyLast(id) {
      console.log("API ready..");
      /******* Last 3D Viewer *******/
      /* Set defaults */
      // vctrApi.setVisibility("LegFb", true, false);
      // vctrApi.setVisibility("LegRod", false, false);
      // let globalRotX = 0;
      // let globalRotY = 0;
      // const rangeTune = 0.8;
      document
        .querySelector(`#${id}`)
        .closest('[js="mouse-move-bounds"')
        .addEventListener("mousemove", async (e) => {
          // const normX = e.clientX / window.innerWidth;
          // const normY = e.clientY / window.innerHeight;
          // const rotX = rangeTune * (normX - 0.5);
          // const rotY = rangeTune * (normY - 0.5);
          // vctrApi.rotateView([rotX - globalRotX, rotY - globalRotY]);
          // globalRotX = rotX;
          // globalRotY = rotY;
        });
      function changeMaterial(updatedMaterial) {
        //   vctrApi.updateMaterial("LegFBShell1", updatedMaterial);
        //   vctrApi.updateMaterial("LegFBShell2", updatedMaterial);
        //   vctrApi.updateMaterial("Pillow1", updatedMaterial);
        //   vctrApi.updateMaterial("Pillow2", updatedMaterial);
        //   vctrApi.updateMaterial("LegRod1", updatedMaterial);
        //   vctrApi.updateMaterial("LegRod2", updatedMaterial);
      }

      document.querySelector("#hue").addEventListener("input", (e) => {
        const h = e.currentTarget.value;
        const s = 30;
        const l = 30;
        const newColor = HSLAToHexA(h, s, l);
        document.querySelector("#hue-hex").value = newColor;
        document.querySelector("#hue-color").style.backgroundColor = newColor;
        document.querySelector(".h-section_arapi").style.backgroundColor =
          newColor;
        const updatedMaterial = { color: newColor };
        changeMaterial(updatedMaterial);
        setPositionToRangeHandler(newColor);
      });
      function changeColorAutomaticaly() {
        let i = 0;
        const interval = setInterval(function () {
          const newColor = HSLAToHexA(i, 30, 30);
          //$('#color').css('background-color', newColor);
          document.querySelector("#hue").value = i;
          changeMaterial({ color: newColor });
          setPositionToRangeHandler(newColor);
          i = i > 350 ? 0 : i + 1;
        }, 50);
        document.querySelector("#hue").addEventListener("change", (_e) => {
          clearInterval(interval);
        });
        document.querySelector("#hue").addEventListener("mousedown", (_e) => {
          clearInterval(interval);
        });
      }
      function setPositionToRangeHandler(newColor) {
        const sliderRange = document.querySelector("#hue").value;
        const sliderPosition = 2.5 + (93 / 360) * sliderRange;
        const sliderColor = newColor;
        document.documentElement.style.setProperty(
          "--hue-range-color",
          sliderColor
        );
        document.querySelector("#hue-color").style.left = sliderPosition + "%";
      }
      function HSLAToHexA(h, s, l) {
        s /= 100;
        l /= 100;
        let c = (1 - Math.abs(2 * l - 1)) * s,
          x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
          m = l - c / 2,
          r = 0,
          g = 0,
          b = 0;
        if (0 <= h && h < 60) {
          r = c;
          g = x;
          b = 0;
        } else if (60 <= h && h < 120) {
          r = x;
          g = c;
          b = 0;
        } else if (120 <= h && h < 180) {
          r = 0;
          g = c;
          b = x;
        } else if (180 <= h && h < 240) {
          r = 0;
          g = x;
          b = c;
        } else if (240 <= h && h < 300) {
          r = x;
          g = 0;
          b = c;
        } else if (300 <= h && h < 360) {
          r = c;
          g = 0;
          b = x;
        }
        // Having obtained RGB, convert channels to hex
        r = Math.round((r + m) * 255).toString(16);
        g = Math.round((g + m) * 255).toString(16);
        b = Math.round((b + m) * 255).toString(16);
        if (r.length === 1) r = "0" + r;
        if (g.length === 1) g = "0" + g;
        if (b.length === 1) b = "0" + b;
        return "#" + r + g + b;
      }
      // const allButtons = document.querySelectorAll(
      //   ".customizer-group .customizer-item"
      // );

      changeColorAutomaticaly();
    }
    try {
      // let iteration = 0;
      function initViewer(id, onReady) {
        onReady(id);
      }
      if ("IntersectionObserver" in window) {
        const IntObsOpts = {
          rootMargin: "100px",
          threshold: 0,
        };
        const callback = (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              switch (entry.target.id) {
                // case "test":
                //   initViewer(entry.target.id, onReadyViewer);
                //   break;
                // case "watch":
                //   initViewer(entry.target.id, onReadyWatch);
                //   break;
                case "viewer3":
                  initViewer(entry.target.id, onReadyLast);
                  break;

                default:
                // do nothing
              }
              observer.unobserve(entry.target);
            }
          });
        };
        const observer = new IntersectionObserver(callback, IntObsOpts);
        const targets = document.querySelectorAll("model-viewer");
        targets.forEach((target) => observer.observe(target));
      } else {
        // await initViewer("test", onReadyViewer);
        // await initViewer("watch", onReadyWatch);
        await initViewer("viewer3", onReadyLast);
      }
    } catch (e) {
      // errHandler(e);
    }
  }
  run();

  return (
    <div>
      <div js="mouse-move-bounds" className="h-section h-section_arapi">
        <div className="h-container">
          <div className="h-section_text pointerevents h-section_text-row">
            <h2
              className="
              h-section_title h-section_title-center h-section_title-margin0
            "
            >
              Studio3D model configurator.
            </h2>
            <p className="h-section_p h-section_p-center h-section_p-margin0">
              With the Studio3D model configurator you can dynamically change
              the materials, the textures, the meshes and the properties of the
              model.
            </p>
          </div>

          <div className="h-arapiviewer">
            <div className="h-viewer_containerapi">
              <div className="h-viewerarembed w-embed w-script">
                <model-viewer
                  data-js-focus-visible=""
                  camera-orbit="225deg 55deg 1m"
                  style={{ width: "100%", height: "100%" }}
                  id="viewer3"
                  src=""
                  ar
                  ar-modes="webxr scene-viewer"
                  ar-scale="auto"
                  camera-controls
                  alt="A 3D model"
                ></model-viewer>
              </div>
            </div>

            <div className="h-ar-form">
              <div className="h-customizer-subtitle">Color</div>
              {/* <div className="customizer-group">
                <div className="customizer-item hue active w-embed">
                  <div id="hue-color">
                    <span></span>
                  </div>
                  <input
                    id="hue"
                    type="range"
                    min="0"
                    max="350"
                    // value="340"
                    step="1"
                  />
                  <input type="text" id="hue-hex" />
                </div>
              </div> */}

              <div className="h-customizer-subtitle">Base</div>
              <div className="customizer-group">
                <div className="customizer-item active" data-option="Metal1">
                  <div className="customizer-item-icon glossy"></div>
                  <div>Metal1</div>
                </div>
                <div className="customizer-item" data-option="Metal2">
                  <div className="customizer-item-icon matte"></div>
                  <div>Metal2</div>
                </div>
                <div className="customizer-item" data-option="Metal3">
                  <div className="customizer-item-icon rock"></div>
                  <div>Metal3</div>
                </div>
              </div>

              <div className="h-customizer-subtitle">Pillow</div>
              <div className="customizer-group">
                <div className="customizer-item active" data-option="Pillow1">
                  <div className="customizer-item-icon light"></div>
                  <div>Pillow1</div>
                </div>
                <div className="customizer-item" data-option="Pillow2">
                  <div className="customizer-item-icon rock"></div>
                  <div>Pillow2</div>
                </div>
                <div className="customizer-item" data-option="Pillow3">
                  <div className="customizer-item-icon dark"></div>
                  <div>Pillow3</div>
                </div>
              </div>

              <div className="h-customizer-subtitle">Wood</div>
              <div className="customizer-group">
                <div className="customizer-item active" data-option="Wood1">
                  <div className="customizer-item-icon light"></div>
                  <div>Wood1</div>
                </div>
                <div className="customizer-item" data-option="Wood2">
                  <div className="customizer-item-icon rock"></div>
                  <div>Wood2</div>
                </div>
                <div className="customizer-item" data-option="Wood3">
                  <div className="customizer-item-icon dark"></div>
                  <div>Wood3</div>
                </div>
              </div>
              {/* 
              <div className="h-customizer-subtitle">Legs</div>
              <div className="customizer-group">
                <div id="legType2" className="customizer-item active center">
                  <div>Fiberglass Leg</div>
                </div>
                <div id="legType1" className="customizer-item center">
                  <div>Rod Frame</div>
                </div>
              </div> */}
            </div>
          </div>

          <div className="h-columns pointerevents">
            <div className="h-column">
              <div className="h-column_title">
                Object &amp; Material Changes
              </div>
              <div className="h-column_p h-column_p-white">
                Dynamically change scene lights, materials and all object
                properties like visibility, rotation, position and scale.
              </div>
            </div>

            <div className="h-column">
              <div className="h-column_title">Animations</div>
              <div className="h-column_p h-column_p-white">
                Switch from pre-selected views, define orbits, animate objects
                or build exploding views into your composition.
              </div>
            </div>

            <div className="h-column">
              <div className="h-column_title">Meta Operations</div>
              <div className="h-column_p h-column_p-white">
                Your entire scene is API accessible, allowing you to build
                solutions like annotations attached to objects or even image
                export.
              </div>
            </div>
          </div>

          <div className="h-section_subbutton"></div>
        </div>
      </div>
    </div>
  );
}

export default Main;
