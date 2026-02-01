import * as Cesium from 'cesium';

export const loadText = function (filePath) {
	var request = new XMLHttpRequest();
	request.open('GET', filePath, false);
	request.send();
	return request.responseText;
}

export const getFullscreenQuad = function () {
	var fullscreenQuad = new Cesium.Geometry({
		attributes: new Cesium.GeometryAttributes({
			position: new Cesium.GeometryAttribute({
				componentDatatype: Cesium.ComponentDatatype.FLOAT,
				componentsPerAttribute: 3,
				//  v3----v2
				//  |     |
				//  |     |
				//  v0----v1
				values: new Float32Array([
					-1, -1, 0, // v0
					1, -1, 0, // v1
					1, 1, 0, // v2
					-1, 1, 0, // v3
				])
			}),
			st: new Cesium.GeometryAttribute({
				componentDatatype: Cesium.ComponentDatatype.FLOAT,
				componentsPerAttribute: 2,
				values: new Float32Array([
					0, 0,
					1, 0,
					1, 1,
					0, 1,
				])
			})
		}),
		indices: new Uint32Array([3, 2, 0, 0, 2, 1])
	});
	return fullscreenQuad;
}

export const createTexture = function (options, typedArray) {
	if (Cesium.defined(typedArray)) {
		// typed array needs to be passed as source option, this is required by Cesium.Texture
		var source = {};
		source.arrayBufferView = typedArray;
		options.source = source;
	}

	var texture = new Cesium.Texture(options);
	return texture;
}

export const createFramebuffer = function (context, colorTexture, depthTexture) {
	var framebuffer = new Cesium.Framebuffer({
		context: context,
		colorTextures: [colorTexture],
		depthTexture: depthTexture
	});
	return framebuffer;
}

export const createRawRenderState = function (options) {
	var translucent = true;
	var closed = false;
	var existing = {
		viewport: options.viewport,
		depthTest: options.depthTest,
		depthMask: options.depthMask,
		blending: options.blending
	};

	var rawRenderState = Cesium.Appearance.getDefaultRenderState(translucent, closed, existing);
	return rawRenderState;
}

export const viewRectangleToLonLatRange = function (viewRectangle) {
	var range = {};

	var postiveWest = Cesium.Math.mod(viewRectangle.west, Cesium.Math.TWO_PI);
	var postiveEast = Cesium.Math.mod(viewRectangle.east, Cesium.Math.TWO_PI);
	var width = viewRectangle.width;

	var longitudeMin;
	var longitudeMax;
	if (width > Cesium.Math.THREE_PI_OVER_TWO) {
		longitudeMin = 0.0;
		longitudeMax = Cesium.Math.TWO_PI;
	} else {
		if (postiveEast - postiveWest < width) {
			longitudeMin = postiveWest;
			longitudeMax = postiveWest + width;
		} else {
			longitudeMin = postiveWest;
			longitudeMax = postiveEast;
		}
	}

	range.lon = {
		min: Cesium.Math.toDegrees(longitudeMin),
		max: Cesium.Math.toDegrees(longitudeMax)
	}

	var south = viewRectangle.south;
	var north = viewRectangle.north;
	var height = viewRectangle.height;

	var extendHeight = height > Cesium.Math.PI / 12 ? height / 2 : 0;
	var extendedSouth = Cesium.Math.clampToLatitudeRange(south - extendHeight);
	var extendedNorth = Cesium.Math.clampToLatitudeRange(north + extendHeight);

	// extend the bound in high latitude area to make sure it can cover all the visible area
	if (extendedSouth < -Cesium.Math.PI_OVER_THREE) {
		extendedSouth = -Cesium.Math.PI_OVER_TWO;
	}
	if (extendedNorth > Cesium.Math.PI_OVER_THREE) {
		extendedNorth = Cesium.Math.PI_OVER_TWO;
	}

	range.lat = {
		min: Cesium.Math.toDegrees(extendedSouth),
		max: Cesium.Math.toDegrees(extendedNorth)
	}

	return range;
}

export const hexToRgb = function (hex) {
	return [
		parseInt(`0x${hex.slice(1, 3)}`) / 255,
		parseInt(`0x${hex.slice(3, 5)}`) / 255,
		parseInt(`0x${hex.slice(5, 7)}`) / 255,
	];
}


// DrawCommand about
export const getPlaneVBO = function (boxLength){
	// 坐标系
	//  z
	//  | /y
	//  |/
	//  o------x

	// 1 定义位置数组
	var v0 = [-0.5, -0.5, 0.0];
	var v1 = [ 0.5, -0.5, 0.0];
	var v2 = [ 0.5,  0.5, 0.0];
	var v3 = [-0.5,  0.5, 0.0];
	var rawVertex = [
			...v0, ...v1, ...v2, ...v3,
	];
	var boxVertex = rawVertex.map(function(v) {
			return v * boxLength;
	});
	var vertices = new Float64Array(boxVertex);

	// 2 定义法向数组
	var npx = [1, 0, 0];
	var nnx = [-1, 0, 0];
	var npy = [0, 1, 0];
	var nny = [0, -1, 0];
	var npz = [0, 0, 1];
	var nnz = [0, 0, -1];
	var normals = new Float32Array([
			...npz, ...npz, ...npz, ...npz,
	]);

	// 3 定义纹理数组
	var sts = new Float32Array([
			0, 0, 0, 1, 1, 1, 1, 0,
	]);

	// 4 定义索引
	var indices = new Uint16Array([
			0, 1, 2, 0, 2, 3,
	]);

	// 创建颜色
	const colors = new Float32Array([
		...[1.0, 0.0, 0.0],
		...[0.0, 1.0, 0.0],
		...[0.0, 0.0, 1.0],
		...[1.0, 1.0, 1.0],
	]);

	return [vertices, indices, sts, normals, colors];
}

export const customPlaneByDrawCommand = function (
    vs,
    fs,
    uniformMap,
    position
) {
    var boxLength = 100000.0;

    var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);

    let [vertices, indices, sts, normals] = getPlaneVBO(boxLength);

    var geometry = new Cesium.Geometry({
        attributes: {
            position: new Cesium.GeometryAttribute({
                componentDatatype: Cesium.ComponentDatatype.DOUBLE,
                componentsPerAttribute: 3,
                values: vertices
            }),
            // normal: new Cesium.GeometryAttribute({
            //     componentDatatype: Cesium.ComponentDatatype.FLOAT,
            //     componentsPerAttribute: 3,
            //     values: normals
            // }),
            st: new Cesium.GeometryAttribute({
                componentDatatype: Cesium.ComponentDatatype.FLOAT,
                componentsPerAttribute: 2,
                values: sts
            }),
        },
        indices: indices,
        primitiveType: Cesium.PrimitiveType.TRIANGLES,
        boundingSphere: Cesium.BoundingSphere.fromVertices(vertices)
    });

    // 5 创建Primitive
    const pri = new CustomPrimitive({
      commandType: 'Draw',
      attributeLocations: {
          position: 0,
          st: 1
      },
      geometry: geometry,// this.createSegmentsGeometry(userInput),
      primitiveType: Cesium.PrimitiveType.TRIANGLES,
      uniformMap: uniformMap,
      vertexShaderSource: vs,
      // vertexShaderSource: `

      //   attribute vec3 position;
      //   attribute vec4 color;

      //   void main() {
      //     gl_Position = czm_projection * czm_view * czm_model * vec4(position,1.0);
      //   }
      // `,
      fragmentShaderSource: fs,
      // fragmentShaderSource: `
      //   varying vec2 uv;

      //   uniform sampler2D colorTexture;

      //   void main(){
      //     vec4 col = colorTex(colorTexture,uv);
      //     // col.a = 0.;
      //     gl_FragColor = col; // vec4(1.0);
      //   }
      // `,
      // rawRenderState: Util.createRawRenderState({
      rawRenderState: {
          // // undefined value means let Cesium deal with it
          // viewport: undefined,
          // depthTest: {
          //     enabled: true
          // },
          // depthMask: true,
          blending: Cesium.BlendingState.ALPHA_BLEND
      },
      // framebuffer: undefined,// .framebuffers.segments,
      // autoClear: true
      modelMatrix: modelMatrix,
    });

	return pri;
}
// 创建 Box
export class MeteorologicalVolume {

	/**
	 * @param {Object} options
	 * @param {Texture} options.dataTex 三维纹理,目前接收 2D Texture
	 * @param {Texture} options.colorTex 色标数据
	 * @param {Cesium.Cartographic} options.dimensionStart 起始坐标
	 * @param {Cesium.Cartographic} options.dimensionEnd 终止坐标
	 */
	constructor(options) {
	  this.fragmentShaderSource = options.fg;
	  this.vertexShaderSource = options.vs;
	  this.heightScale = options.heightScale ?? 1;
	  this.heightScale = options.heightScale ?? 1;
	  this.alphaCoefficient = options.alphaCoefficient ?? 1;
	  this.steps = options.steps ?? 20;
	  this.colorTex = options.colorTex;
	  this.maxColorValue = options.maxColorValue,
	  this.minColorValue = options.minColorValue,
	  this.threshold = options.filterValue;
	  this.threshold_max = options.filterMaxValue;
	  this.RebuildCommand = false;
	  this.dataTex = options.dataTex;

	  this.dimensionStart = options.dimensionStart;// 必传
	  this.dimensionEnd = options.dimensionEnd;// 必传
	  this.updateOptions();
	}

	updateOptions() {

		if(!this.fragmentShaderSource){
			this.fragmentShaderSource = /* glsl */`
				precision highp float;
				precision highp sampler3D;

				uniform sampler2D u_textureColor;
				uniform sampler2D u_3DTexture;
				uniform float u_threshold;
				uniform float u_threshold_max;
				uniform float u_alphaCoefficient;
				uniform float u_steps;

				varying vec3 vOrigin;
				varying vec3 vDirection;

				struct MultipleValues {
					float d;
					vec4 col;
				};


				vec2 hitBox( vec3 orig, vec3 dir ) {
					vec3 box_min = vec3( - 0.5);
					vec3 box_max = vec3( 0.5 );

					// box_min.z += 0.5;
					// box_max.z += 0.5; // 被裁切了

					vec3 inv_dir = 1.0 / dir;
					vec3 tmin_tmp = ( box_min - orig ) * inv_dir;// means 获取 沿着 dir 方向的向量
					vec3 tmax_tmp = ( box_max - orig ) * inv_dir;

					vec3 tmin = min( tmin_tmp, tmax_tmp ); // component-wise
					vec3 tmax = max( tmin_tmp, tmax_tmp ); // component-wise

					float t0 = max( tmin.x, max( tmin.y, tmin.z ) );
					float t1 = min( tmax.x, min( tmax.y, tmax.z ) );

					return vec2( t0, t1 );
				}

				// // The maximum distance through our rendering volume is sqrt(3).
				// // The maximum number of steps we take to travel a distance of 1 is 512.
				// // ceil( sqrt(3) * 512 ) = 887
				// // This prevents the back of the image from getting cut off when steps=512 & viewing diagonally.
				// //  - - -> 新的格式： (7 * 547) x 481 // ???????????
				// const int MAX_STEPS =  25; //  1894;// 887; //
				float linearScale(float domainStart, float domainEnd, float rangeStart, float rangeEnd, float value) {
					return ((rangeEnd - rangeStart) * (value - domainStart)) / (domainEnd - domainStart) + rangeStart;
				}

				// const float slicesPerSide = 16.0;
				// const float zDepth = slicesPerSide * slicesPerSide - 1.0;
				// const float slicesPerSide_X = 7.0;
				// const float slicesPerSide_Y = 6.0;
				const float slicesPerSide_X = 16.0;
				const float slicesPerSide_Y = 16.0;
				// const float slicesPerSide_X = 7.0;
				// const float slicesPerSide_Y = 1.0;

				// const float zDepth = slicesPerSide * slicesPerSide - 1.0;
				const float zDepth = slicesPerSide_X * slicesPerSide_Y  - 1.0;
				//Acts like a texture3D using Z slices and trilinear filtering.
				MultipleValues sampleAs3DTexture( vec3 texCoord ){

					MultipleValues result;

					// texCoord.x = linearScale(0.0, 1.0, 0.0, 1.0, texCoord.x);
					// texCoord.y = linearScale(0.0, 1.0, 0.0, 1.0, texCoord.y);

					vec4 colorSlice1, colorSlice2;
					vec2 texCoordSlice1, texCoordSlice2;

					//The z coordinate determines which Z slice we have to look for.
					//Z slice number goes from 0 to 255.
					float zSliceNumber1 = floor(texCoord.z * zDepth);

					//As we use trilinear we go the next Z slice.
					float zSliceNumber2 = min( zSliceNumber1 + 1.0, zDepth); //Clamp to 255

					//The Z slices are stored in a matrix of 16x16 of Z slices.
					//The original UV coordinates have to be rescaled by the tile numbers in each row and column.
					// texCoord.xy /= slicesPerSide;
					texCoord.x /= slicesPerSide_X;
					texCoord.y /= slicesPerSide_Y;

					texCoordSlice1 = texCoordSlice2 = texCoord.xy;

					//Add an offset to the original UV coordinates depending on the row and column number.
					//texCoordSlice1.x += (mod(zSliceNumber1, slicesPerSide ) / slicesPerSide);
					//texCoordSlice1.y += floor((zDepth - zSliceNumber1) / slicesPerSide) / slicesPerSide;
					//texCoordSlice2.x += (mod(zSliceNumber2, slicesPerSide ) / slicesPerSide);
					//texCoordSlice2.y += floor((zDepth - zSliceNumber2) / slicesPerSide) / slicesPerSide;

					texCoordSlice1.x +=          (mod(zSliceNumber1, slicesPerSide_X ) / slicesPerSide_X);
					texCoordSlice1.y += floor((zDepth - zSliceNumber1) / slicesPerSide_X) / slicesPerSide_Y;
					texCoordSlice2.x +=          (mod(zSliceNumber2, slicesPerSide_X ) / slicesPerSide_X);
					texCoordSlice2.y += floor((zDepth - zSliceNumber2) / slicesPerSide_X) / slicesPerSide_Y;

					//Get the opacity value from the 2D texture.
					//Bilinear filtering is done at each texture2D by default.
					colorSlice1 = texture2D( u_3DTexture, texCoordSlice1 );
					colorSlice2 = texture2D( u_3DTexture, texCoordSlice2 );

					colorSlice1.a = min(( colorSlice1.a * 255.0 ), 70.0) / 70.0; // use [0,70]
					colorSlice2.a = min(( colorSlice2.a * 255.0 ), 70.0) / 70.0; // use [0,70]

					result.d = colorSlice2.a;

					// Based on the opacity obtained earlier, get the RGB color in the transfer function texture.
					// colorSlice1.rgb = texture2D( u_textureColor, vec2( colorSlice1.a, 1.0) ).rgb;
					// colorSlice2.rgb = texture2D( u_textureColor, vec2( colorSlice2.a, 1.0) ).rgb;
					colorSlice1 = texture2D( u_textureColor, vec2( colorSlice1.a, 1.0) );
					colorSlice2 = texture2D( u_textureColor, vec2( colorSlice2.a, 1.0) );

					//How distant is zSlice1 to ZSlice2. Used to interpolate between one Z slice and the other.
					float zDifference = mod(texCoord.z * zDepth, 1.0);

					//Finally interpolate between the two intermediate colors of each Z slice.
					result.col = mix(colorSlice1, colorSlice2, zDifference);

					return result;

				}

				void main(){

					vec4 color = vec4(0.0);

					//The color accumulator.
					vec4 accumulatedColor = vec4(0.0);

					//The alpha value accumulated so far.
					float accumulatedAlpha = 0.0;

					//How long has the ray traveled so far.
					int accumulatedLength = 0;

					vec4 colorSample;
					float alphaSample;

					vec3 rayDir = normalize( vDirection );
					// 获取当前像素点(Ray)在当前相机位置下的
					vec2 bounds = hitBox( vOrigin, rayDir );// 得到当前 ray/pixel 穿过 Cube 的范围【基于各个轴向】： (最近距离，最远距离)
					if ( bounds.x > bounds.y ) discard;
					bounds.x = max( bounds.x, 0.0 );

					vec3 p = vOrigin + bounds.x * rayDir;
					// - - - 》 基于 p, 获取到当前 ray 需要落到哪个 Z-slice 上: 当前 p E [-0.5, 0.5],  p + 0.5 E [0,1], 此时， 获取靠近哪个 Z-slice

					vec3 inc = 1.0 / abs( rayDir) ;
					// float delta = min(inc.z, min( inc.x, inc.y ));// inc.z;// 为了 按照最小的单位在各个轴向去采样，这样更精确
					float delta = inc.z;// min(inc.z, min( inc.x, inc.y ));// inc.z;// 为了 按照最小的单位在各个轴向去采样，这样更精确
					delta /= u_steps;

					// //The increment in each direction for each step.
					// vec3 deltaDirection = normalize(rayDir) * delta;
					// float deltaDirectionLength = length(deltaDirection);



					//If we have twice as many samples, we only need ~1/2 the alpha per sample.
					//Scaling by 256/10 just happens to give a good value for the u_alphaCoefficient slider.
					// float alphaScaleFactor = 25.6 * delta;
					float alphaScaleFactor = (256.0/10.0) * delta;
					// float alphaScaleFactor = delta;

					for ( float t = bounds.x; t < bounds.y; t += delta ) {

						// 这里取 color 的value, 然后 通过色标取值
						vec3 pos = p + 0.5;
						// float d = sample1( pos );
						MultipleValues res = sampleAs3DTexture( pos );

						colorSample = res.col;

						if ( res.d > u_threshold && res.d < u_threshold_max) {

							//Allow the alpha correction customization.
							alphaSample = colorSample.a * u_alphaCoefficient;

							//Applying this effect to both the color and alpha accumulation results in more realistic transparency.
							alphaSample *= (1.0 - accumulatedAlpha);

							//Scaling alpha by the number of steps makes the final color invariant to the step size.
							alphaSample *= alphaScaleFactor;

							//Perform the composition.
							accumulatedColor += colorSample * alphaSample;

							//Store the alpha accumulated so far.
							accumulatedAlpha += alphaSample;

							color = accumulatedColor;

							// accumulatedLength += deltaDirectionLength;
							// accumulatedLength += 1;

							if( accumulatedAlpha >= 1.0 ) break;


						}
						p += rayDir * delta;
					}
					if ( color.a == 0.0 ) discard;

					gl_FragColor = color;
				}
			`;
		}
		if(!this.vertexShaderSource){
			this.vertexShaderSource = /* glsl */`
				attribute vec3 position;
				attribute vec2 st;

				varying vec3 vOrigin;
				varying vec3 vDirection;

				void main() {
					vOrigin = czm_encodedCameraPositionMCHigh + czm_encodedCameraPositionMCLow;
					vDirection = position - vOrigin;
					gl_Position = czm_modelViewProjection * vec4(position,1.0);
				}
			`;
		}

		this.RebuildCommand = true;

		// 三维纹理
		// this.dataTex = options.dataTex;


		const dimensionStart= this.dimensionStart; // 起始坐标
		const dimensionEnd = this.dimensionEnd; // 终止坐标

		// 计算经纬度范围
		const rectangle = Cesium.Rectangle.fromRadians(
			dimensionStart.longitude,
			dimensionStart.latitude,
			dimensionEnd.longitude,
			dimensionEnd.latitude
		);

		// rectangle的中心
		const rectangleCenter = Cesium.Rectangle.center(rectangle);

		// 获取东北点
		const northeast = Cesium.Cartographic.toCartesian(
			Cesium.Rectangle.northeast(rectangle)
		);
		// 获取西北点
		const northwest = Cesium.Cartographic.toCartesian(
			Cesium.Rectangle.northwest(rectangle)
		);
		// 获取东南
		const southeast = Cesium.Cartographic.toCartesian(
			Cesium.Rectangle.southeast(rectangle)
		);

		// 计算缩放长度
		const length1 = Cesium.Cartesian3.distance(northeast, northwest);
		const length2 = Cesium.Cartesian3.distance(northeast, southeast);

		// 中心点
		const centerHeight = ((dimensionEnd.height + dimensionStart.height) / 2) * this.heightScale;
		const center = Cesium.Cartesian3.fromRadians(
			rectangleCenter.longitude,
			rectangleCenter.latitude,
			centerHeight
		);

		// 包围球半径
		let radius = length1 > length2 ? length1 : length2;
		radius = radius > centerHeight ? radius : centerHeight;

		// 平移旋转矩阵
		const primitiveModelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center);

		// 缩放矩阵
		const scaleMatrix4 = Cesium.Matrix4.fromScale(
			new Cesium.Cartesian3(length1, length2, centerHeight * 2)
		);

		this.boundingSphere = new Cesium.BoundingSphere(center, radius);

		// 最终的模型矩阵
		this.modelMatrix = Cesium.Matrix4.multiply(
			primitiveModelMatrix,
			scaleMatrix4,
			primitiveModelMatrix
		);

		// this.drawCommand && (this.drawCommand.modelMatrix = this.modelMatrix);// 这样改camera靠近会有问题

	}

	createCommand(context) {


	const width = 1.0;
	const height = 1.0;
	const depth = 1.0;
	const boxgeometry = new Cesium.BoxGeometry({
		vertexFormat : Cesium.VertexFormat.POSITION_ONLY,
		minimum: new Cesium.Cartesian3(-width / 2, -height / 2, -depth / 2),
		maximum: new Cesium.Cartesian3(width / 2, height / 2, depth / 2)
	  });
	  const geometry = Cesium.BoxGeometry.createGeometry(boxgeometry);


	  const attributelocations = Cesium.GeometryPipeline.createAttributeLocations(geometry);
	  this.vertexarray = Cesium.VertexArray.fromGeometry({
		context,
		geometry,
		attributes: attributelocations,
	  });
	  const renderstate = Cesium.RenderState.fromCache({
		depthTest: {
		  enabled: true,
		},
		cull: {
		  enabled: false,
		},
		// blending: BlendingState.ALPHA_BLEND
	  });
	  const shaderProgram = Cesium.ShaderProgram.fromCache({
		boundingSphere: geometry.boundingSphere,
		context,
		vertexShaderSource: this.vertexShaderSource,
		fragmentShaderSource: this.fragmentShaderSource,
		attributeLocations: attributelocations,
	  });

	  const that = this;
	  const uniformmap = {
		u_3DTexture() {
		  return that.dataTex;
		},
		u_textureColor() {
		  return that.colorTex;
		},
		u_threshold() {
		//   const val = ((that.threshold - that.minColorValue) - that.minColorValue) / ((that.maxColorValue - that.minColorValue) - that.minColorValue);
		//   return  val < 0.071 ? 0.071 : val; // that.threshold;
		  return 0.071;
		},
		u_threshold_max() {
		//   const val = ((that.threshold_max - that.minColorValue) - that.minColorValue) / ((that.maxColorValue - that.minColorValue) - that.minColorValue);
		//   return  val < 0.071 ? 0.071 : val;
		  return  1.0;
		},
		u_steps() {
		  return that.steps;
		},
		u_alphaCoefficient() {
		  return that.alphaCoefficient;
		},
		u_x_piece() {
		  return 10.0;
		},
		u_y_piece() {
		  return 8.0;
		},
	  };

	  console.log("before_create_DrawCommand")
	  this.drawCommand = new Cesium.DrawCommand({
		boundingVolume: this.boundingSphere,
		modelMatrix: this.modelMatrix,
		pass: Cesium.Pass.TRANSLUCENT,
		shaderProgram,
		renderState: renderstate,
		vertexArray: this.vertexarray,
		uniformMap: uniformmap,
	  });
	  console.log("after_create_DrawCommand")
	}

	update(frameState) {
	  if (!this.drawCommand || this.RebuildCommand) {
		this.createCommand(frameState.context);
		this.RebuildCommand = false;
	  }
	  frameState.commandList.push(this.drawCommand);
	}

	updateData(option) {
	  this.updateOptions();
	}

	// 之后弄到一起
	changeThreshold(value) {
	  this.threshold = value;//(value - this.minColorValue) / (this.maxColorValue - this.minColorValue);
	}
	changeMaxThreshold(value) {
	  this.threshold_max = value;//(value - this.minColorValue) / (this.maxColorValue - this.minColorValue);
	}

	changeSteps(value) {
	  this.steps = value;
	}
	changeAlpha(value) {
	  this.alphaCoefficient = value;
	}
	changeHeightScale(value) {
	  this.heightScale = value;

	  this.updateOptions();
	  this.RebuildCommand = true;
	}

	destroy() {}
}

export const getRandomShapePlaneVBO = function (boxLength){
	// 坐标系
	//  z
	//  | /y
	//  |/
	//  o------x

	// 1 定义位置数组
	var v0 = [-0.5, -0.5, 0.0];
	var v1 = [ 0.5, -0.5, 0.0];
	var v2 = [ 0.5,  0.5, 0.0];
	var v3 = [-0.5,  0.5, 0.0];
	var v4 = [0.0,  0.0, 0.0];
	// var v5 = [-0.25,  0.25, 0.0];
	// var v6 = [-0.25,  0.25, 0.0];
	// var v7 = [-0.25,  0.25, 0.0];
	var rawVertex = [
			...v0, ...v1, ...v2, ...v3,
			...v4,
	];
	var boxVertex = rawVertex.map(function(v) {
			return v * boxLength;
	});
	var vertices = new Float64Array(boxVertex);

	// 2 定义法向数组
	var npx = [1, 0, 0];
	var nnx = [-1, 0, 0];
	var npy = [0, 1, 0];
	var nny = [0, -1, 0];
	var npz = [0, 0, 1];
	var nnz = [0, 0, -1];
	var normals = new Float32Array([
			...npz, ...npz, ...npz, ...npz,
			...npz,
	]);

	// 3 定义纹理数组 - - - 暂时不用
	var sts = new Float32Array([
			0, 0, 0, 1, 1, 1, 1, 0,
	]);

	// 4 定义索引
	var indices = new Uint16Array([
			0, 4, 1,
			1, 4, 2,
			2, 4, 3,
			3, 4, 0
	]);

	// 创建颜色
	const colors = new Float32Array([
		...[1.0, 0.0, 0.0],
		...[0.0, 1.0, 0.0],
		...[0.0, 0.0, 1.0],
		...[1.0, 1.0, 1.0],
		...[1.0, 0.5, 0.0],
	]);

	return [vertices, indices, sts, normals, colors];
}
export class CustomPrimitive {
	constructor(options) {
		this.commandType = options.commandType;

		this.geometry = options.geometry;
		this.modelMatrix = options.modelMatrix ? options.modelMatrix : Cesium.Matrix4.IDENTITY;
		this.texture = options.texture ? options.texture : null;
		this.attributeLocations = options.attributeLocations;
		this.primitiveType = options.primitiveType;
		this.pass = options.pass ? options.pass : Cesium.Pass.OPAQUE;

		this.uniformMap = options.uniformMap;

		this.vertexShaderSource = options.vertexShaderSource;
		this.fragmentShaderSource = options.fragmentShaderSource;

		this.rawRenderState = options.rawRenderState;
		this.framebuffer = options.framebuffer;

		this.outputTexture = options.outputTexture;

		this.autoClear = Cesium.defaultValue(options.autoClear, false);
		this.preExecute = options.preExecute;

		this.show = true;
		this.commandToExecute = undefined;
		this.clearCommand = undefined;
		if (this.autoClear) {
				this.clearCommand = new Cesium.ClearCommand({
						color: new Cesium.Color(0.0, 0.0, 0.0, 0.0),
						depth: 1.0,
						framebuffer: this.framebuffer,
						pass: Cesium.Pass.OPAQUE
				});
		}
	}

	createCommand(context) {
		switch (this.commandType) {
			case 'Draw': {
					var vertexArray = Cesium.VertexArray.fromGeometry({
							context: context,
							geometry: this.geometry,
							attributeLocations: this.attributeLocations,
							bufferUsage: Cesium.BufferUsage.STATIC_DRAW,
					});

					var shaderProgram = Cesium.ShaderProgram.fromCache({
							context: context,
							attributeLocations: this.attributeLocations,
							vertexShaderSource: this.vertexShaderSource,
							fragmentShaderSource: this.fragmentShaderSource
					});

					// if (this.texture) {
					//     this.uniformMap.image = function (context) {
					//         return this.texture(context);
					//     }
					// }

					var renderState = Cesium.RenderState.fromCache(this.rawRenderState);
					return new Cesium.DrawCommand({
							owner: this,
							vertexArray: vertexArray,
							primitiveType: this.primitiveType,
							uniformMap: this.uniformMap,
							modelMatrix: this.modelMatrix,
							shaderProgram: shaderProgram,
							framebuffer: this.framebuffer,
							renderState: renderState,
							pass: this.pass
					});
			}
			case 'Compute': {
					return new Cesium.ComputeCommand({
							owner: this,
							fragmentShaderSource: this.fragmentShaderSource,
							uniformMap: this.uniformMap,
							outputTexture: this.outputTexture,
							persists: true
					});
			}
		}
	}

	setGeometry(context, geometry) {
		this.geometry = geometry;
		var vertexArray = Cesium.VertexArray.fromGeometry({
				context: context,
				geometry: this.geometry,
				attributeLocations: this.attributeLocations,
				bufferUsage: Cesium.BufferUsage.STATIC_DRAW,
		});
		this.commandToExecute.vertexArray = vertexArray;
	}

	update(frameState) {
		if (!this.show) {
				return;
		}

		if (!Cesium.defined(this.commandToExecute)) {
				this.commandToExecute = this.createCommand(frameState.context);
		}

		if (Cesium.defined(this.preExecute)) {
				this.preExecute();
		}

		if (Cesium.defined(this.clearCommand)) {
				frameState.commandList.push(this.clearCommand);
		}
		frameState.commandList.push(this.commandToExecute);
	}

	isDestroyed() {
		return false;
	}

	destroy() {
		if (Cesium.defined(this.commandToExecute)) {
				this.commandToExecute.shaderProgram = this.commandToExecute.shaderProgram && this.commandToExecute.shaderProgram.destroy();
		}
		return Cesium.destroyObject(this);
	}
}





// 用于判断当前运行的 webGL 版本
export const checkWebGlVersion = (context)=>{
    const gl = context._gl;  // Get the WebGL context
    // Check if WebGL 2 is supported
    const isWebGL2 = gl instanceof WebGL2RenderingContext;
    if (isWebGL2) {
        console.log("WebGL 2.0 is in use.");
    } else {
        console.log("WebGL 1.0 is in use.");
    }
}

// 工具方法
export const createAxis = ({viewer, modelPosition, axisLength = 10000.0})=>{
	// 获取模型的变换矩阵
	const modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(modelPosition);

	// 定义坐标轴的长度
	// const axisLength; // in meter

	// 定义坐标轴的颜色
	const axisColors = {
		x: Cesium.Color.RED,
		y: Cesium.Color.GREEN,
		z: Cesium.Color.BLUE
	};

	// 计算X轴终点
	const xAxis = Cesium.Matrix4.multiplyByPoint(
		modelMatrix,
		new Cesium.Cartesian3(axisLength, 0, 0),
		new Cesium.Cartesian3()
	);

	// 计算Y轴终点
	const yAxis = Cesium.Matrix4.multiplyByPoint(
		modelMatrix,
		new Cesium.Cartesian3(0, axisLength, 0),
		new Cesium.Cartesian3()
	);

	// 计算Z轴终点
	const zAxis = Cesium.Matrix4.multiplyByPoint(
		modelMatrix,
		new Cesium.Cartesian3(0, 0, axisLength),
		new Cesium.Cartesian3()
	);


	// 添加X轴
	viewer.entities.add({
		name: "X轴",
		polyline: {
			positions: [modelPosition, xAxis],
			width: 4,
			material: axisColors.x
		}
	});

	// 添加Y轴
	viewer.entities.add({
		name: "Y轴",
		polyline: {
			positions: [modelPosition, yAxis],
			width: 4,
			material: axisColors.y
		}
	});

	// 添加Z轴
	viewer.entities.add({
		name: "Z轴",
		polyline: {
			positions: [modelPosition, zAxis],
			width: 4,
			material: axisColors.z
		}
	});
}
export const getTexture = ({
	viewer,
	img,
	width=600,
	height=600
})=>{
	img.width = width;
	img.height = height;

	console.log('%c [ img ]-1005', 'font-size:13px; background:pink; color:#bf2c9f;', img)

	const context = viewer.scene.context;
	const tex = new Cesium.Texture({
		context: context,
		source: img
	});
	return tex
}
