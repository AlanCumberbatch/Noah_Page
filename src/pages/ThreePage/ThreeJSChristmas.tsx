// import { useState, useEffect, useRef } from 'react';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
// import DynamicGradientText from '../UIComponents/DynamicGradientText';

// const ThreePage = () => {
const ThreePage: React.FC = () => {

  // // const [animationDirection, setAnimationDirection] = useState('bg-left');
  // const [animationDirection] = useState('bg-left');

  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const w = mount?.clientWidth || window.innerWidth;
    const h = mount?.clientHeight || window.innerHeight;
    // const w = window.innerWidth;
    // const h = window.innerHeight;

    // 初始化场景、摄像机和渲染器
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(w, h);
    mount.appendChild(renderer.domElement);

    // 创建平面几何体和着色器材质
    const fragmentShader = `
      uniform vec2 iResolution;
      uniform float iTime;

      // SNOW background from @g1mishr's "Snow Simple " https://www.shadertoy.com/view/DlGczD
#define TILES 10.0

//2D random from https://www.shadertoy.com/view/WstGDj
float random (vec2 uv) {
    return fract(sin(dot(uv, vec2(135., 263.))) * 103.214532);
}

vec4 drawSnow(vec2 curid, vec2 uv, vec4 fragColor, float r, float c)
{
    float maxoff = 2.0 / TILES; //calculate the max offset a particle can have (two tiles)

    //loop through neighboring tiles
    for(int x=-2; x<=1; x++)
    {
        for(int y=-2; y<=0; y++)
        {
            float rad = (1.0 / (TILES * 5.0)) * r; //set default radius
            vec2 id = curid + vec2(x, y); //get the id of the tile we're visiting
            vec2 pos = id / TILES; //calculate position
            float xmod = mod(random(pos), maxoff);
            pos.x += xmod; //add a random x-offset
            pos.y += mod(random(pos+vec2(4,3)), maxoff); //add a random y-offset
            rad *= mod(random(pos), 1.0); //vary the radius by multiplying by a random val
            pos.x += 0.5*(maxoff-xmod)*sin(iTime*r + random(pos)*100.0); //dynamic sin wave x-offset

            float len = length(uv - pos); //calculate distance from tile's particle

            //if we're inside the particle, draw it
            float v = smoothstep(0.0, 1.0, (rad - len) / rad*0.75);
            fragColor = mix(fragColor, vec4(c), v);
        }
    }

    return fragColor;
}


vec4 snowBackground( vec2 fragCoord )
{
    vec4 fragColor = vec4(0.0);
    vec2 uv = (2.0*fragCoord - iResolution.xy)/iResolution.x;
    uv.y -= 0.3;

    //uv.x -= 0.6;


    vec3 col = mix(vec3(0.0, 0.45, 0.85), vec3(1), -0.3-uv.y);

    // Output to screen
    fragColor = vec4(col,1.0);

    vec4 bg = vec4(.529, .808, .922, 1) * 0.25;
    vec2 uvNorm = fragCoord.xy / iResolution.xy; //normalized UV coordinate [0, 1]
    vec2 uvog = fragCoord.xy / iResolution.y; //UV coordinate (will remain static)
    uv = fragCoord.xy / iResolution.y; //UV coordinate (we'll modify this one)

    //draw the closest snow layer
    uv += 0.2*vec2(-iTime, iTime); //move the UV coords based on time
    vec2 curid = floor(uv * TILES); //calculate the ID associated with the current UV
    curid += vec2(0.5); //center the ID

    //if(curid.y > 10.0)
    {
    fragColor = drawSnow(curid, uv, fragColor, 1.0, 0.9); //draw closest snow layer

    //draw the middle snow layer, calculate new UV and ID
    uv = uvog + 0.1*vec2(-iTime - 100.0, iTime + 100.0);
    curid = floor(uv * TILES);
    curid += vec2(0.5);
    fragColor += drawSnow(curid, uv, vec4(0), 0.75, 0.45);

    //draw the far snow layer, calculate new UV and ID
    uv = uvog + 0.05*vec2(-iTime - 150.0, iTime + 150.0);
    curid = floor(uv * TILES);
    curid += vec2(0.5);
    fragColor += drawSnow(curid, uv, vec4(0), 0.5, 0.225);

    //fragColor = smoothstep(0.0, 3.0, iTime)*fragColor;
    }
    return fragColor;
}

// END Snow Simple https://www.shadertoy.com/view/DlGczD



#define PI  3.14159265359
#define TAU 6.28318530718
#define rot(f) mat2(cos(f), -sin(f), sin(f), cos(f))

const float dist_infin = 10.0;
#define nn 128
const float eps = 0.001;

vec3 sdfColor;
vec3 resColor;
float sdfReflect = 0.;
vec3 col1 = vec3(0.3764, 0.8196, 0.3725);
vec3 col2 = vec3(0.8117, 0.1764, 0.8078);

float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);

}

//https://www.shadertoy.com/view/mlcyDj
vec4 texChar(float char, vec2 uv) {
    vec2 pt = uv/16.0;
    pt.x += char/16.0;
    pt.y += 12.0/16.0;
    return texture(iChannel0, pt);
}

float sdTextBox ( vec2 p, vec2 b, float char ) {
    float l = sdBox(p,b);
    vec2 pn = (p.xy / b.xy) * .5 + .5;
    float lt = (texChar(char, pn).w - 0.5);
    return max(lt,l);
}
//===========================================

float sdBox3( in vec3 p, in vec2 b, float h, float char)
{
    float d = sdTextBox(p.xy, b, char);
    vec2 w = vec2( d, abs(p.z) - h );
    return min(max(w.x,w.y),0.0) + length(max(w,0.0)) - 0.02;
}

float glzoom = 1.0;
float mapChar( in vec3 pos, float char )
{
    return sdBox3(pos, vec2(glzoom, glzoom), 0.2*glzoom, char);
}



float map(vec3 p) {
    float text[4];
    text[0] = 2.;
    text[1] = 0.;
    text[2] = 2.;
    text[3] = 4.;
    float start = 1.5;//1.4;
    float d = dist_infin;
    for (int i = 0; i < 4; i++)
    {
        vec3 shift = vec3(start-float(i), 0., 0.);
        d = min(mapChar(p+shift, text[i]), d);
    }
    return d;
}


vec3 GetRayDir(vec2 uv, vec3 p, vec3 l, float z) {
    vec3 f = normalize(l - p), r = normalize(vec3(f.z, 0, -f.x)), u = cross(f, r), c = f * z, i = c + uv.x * r + uv.y * u;
    return normalize(i);
}

#define AA 1


// IQ's vec2 to float hash.
float hash21(vec3 p){
    return fract(sin(mod(dot(normalize(p), vec3(27.609, 57.583, 11.2345)), 6.2831853))*43758.5453);
}

float npp = 60.;
float level = 0.85;
vec3 point(vec3 p) {
    return floor(p*npp)/npp;
}

vec3 hsb2rgb( in vec3 c )
{
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return (c.z * mix( vec3(1.0), rgb, c.y));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    //https://www.shadertoy.com/view/lcfGWH
    vec3 snowBgcol = snowBackground( fragCoord ).rgb;
    vec3 bg = snowBgcol;

    vec3 light = normalize(vec3(0.0, .0, 1.)); //light
    vec3 light2 = normalize(vec3(0.0, 0.0, -1.)); //light
    vec2 mo = vec2(.0, 1.0);
    if  (iMouse.z > 0.0)
    {
        mo = (-iResolution.xy + 2.0 * (iMouse.xy)) / iResolution.y;
    }
    glzoom = 1.1*clamp(1.0 - clamp(cos(iTime/2.), 0., 1.0), 0.01, 1.0);
    vec3 ro = vec3(0.0, 0.0, 2.); // camera
    //camera rotation
    ro.yz *= rot(mo.y * PI);
    ro.xz *= rot(-mo.x * TAU);

    const float fl = 1.5; // focal length
    float dist = dist_infin;


    //antialiasing
    vec3 tot = vec3(0.0);
    for(int m = 0; m < AA; m++) for(int n = 0; n < AA; n++) {
            vec2 o = vec2(float(m), float(n)) / float(AA) - 0.5;
            vec2 p = (-iResolution.xy + 2.0 * (fragCoord + o)) / iResolution.y;
            vec3 rd = GetRayDir(p, ro, vec3(0, 0., 0), fl); //ray direction
            vec3 col = bg; // background
            //==========================raymatch=============================
            float td = 0.;
            vec3 pos = vec3(0.);
            for(int i = 0; i < nn; i++) {
                pos = ro + rd * td;
                float h = map(pos);

                if(h < eps)
                {
                    vec3 pp = point(pos);
                    float fil = hash21(pp);
                    if (fil > level /*&& length(pos-pp) < 1./npp*/)
                        break;
                    else
                        h = 0.05;
                }
                td += h;
                if (td >= dist_infin)
                    break;
            }
            if(td < dist_infin) {
                vec3 pp = point(pos);
                float fil = hash21(pp);
                if (fil > level /*&& length(pos-pp) < 1./npp*/)
                {
                    //float blink=1.0;//-cos(5.0*2.0*iTime);
                    col = hsb2rgb(vec3(fract(fil*1000.)*3., 1., 2.)); //blink+0.9
                }
            }
            //==========================raymatch=============================
            tot += col;
        }
    //tot = sqrt(tot) / float(AA);
    tot = tot / float(AA);
    //antialiasing
    fragColor = vec4(tot, 1.0);
}

      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const material = new THREE.ShaderMaterial({
      fragmentShader,
      uniforms: {
        iResolution: { value: new THREE.Vector2(mount.clientWidth, mount.clientHeight) },
        iTime: { value: 0 },
      },
    });

    const geometry = new THREE.PlaneGeometry(w, h);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    camera.position.z = 1;

    // 调整画布大小
    const handleResize = () => {
      renderer.setSize(w, h);
      material.uniforms.iResolution.value.set(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 动画循环
    const clock = new THREE.Clock();
    const animate = () => {
      material.uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // 清理资源
    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
      material.dispose();
      geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div
        ref={mountRef}
        className="flex-grow w-full"
      ></div>
    </motion.div>
  );
}

export default ThreePage;