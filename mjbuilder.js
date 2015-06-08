/*
 Javascript MotionJPEG/AVI Builder

-- MIT License

Copyright (c) 2012 Satoshi Ueyama

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
*/

(function(aGlobal) {
	"use strict";
	var AVIF_HASINDEX = 0x00000010;
	var AVIIF_KEYFRAME = 0x00000010;
	var RateBase = 1000000;
	var Verbose = false;

	function MotionJPEGBuilder() {
		this.b64 = new Base64();
		this.movieDesc = {
			w: 0, h:0, fps: 0,
			videoStreamSize: 0,
			maxJPEGSize: 0
		};

		this.avi = MotionJPEGBuilder.createAVIStruct();
		this.headerLIST = MotionJPEGBuilder.createHeaderLIST();
		this.moviLIST   = MotionJPEGBuilder.createMoviLIST();
		this.frameList  = [];
	}


	MotionJPEGBuilder.prototype = {
		setup: function(frameWidth, frameHeight, fps) {
			this.movieDesc.w = frameWidth;
			this.movieDesc.h = frameHeight;
			this.movieDesc.fps = fps;
		},

		addCanvasFrame: function(canvas) {
			var u = canvas.toDataURL('image/jpeg');
			var dataStart = u.indexOf(',') + 1;

			var bytes = this.b64.decode(u.substring(dataStart));
			if (bytes.length % 2) { // padding
				bytes.push(0);
			}

			var abuf = new ArrayBuffer(bytes.length);
			var u8a  = new Uint8Array(abuf);
			var i;
			for (i = 0;i < bytes.length;i++) {
				u8a[i] = bytes[i];
			}


			var blob = new Blob([abuf], {type : 'image/jpeg'});

			var bsize = blob.size;
			this.movieDesc.videoStreamSize += bsize;
			this.frameList.push(blob);

			if (this.movieDesc.maxJPEGSize < bsize) {
				this.movieDesc.maxJPEGSize = bsize;
			}
		},

		addVideoStreamData: function(list, frameBuffer) {
			var stream = MotionJPEGBuilder.createMoviStream();
			stream.dwSize = frameBuffer.size;
			stream.handler = function(data) {
				data.blob = new Blob([data.blob,frameBuffer], {type:'video/avi'});
			};

			list.push(stream);
			return stream.dwSize + 8;
		},

		finish: function(onFinish) {
			var streamSize = 0;
			this.moviLIST.aStreams = [];
			var frameCount = this.frameList.length;
			var frameIndices = [];
			var frOffset = 4; // 'movi' +0
			var IndexEntryOrder = ['chId', 'dwFlags', 'dwOffset', 'dwLength'];
			for (var i = 0;i < frameCount;i++) {
				var frsize = this.addVideoStreamData(this.moviLIST.aStreams, this.frameList[i]);
				frameIndices.push({
					chId: '00dc',
					dwFlags: AVIIF_KEYFRAME,
					dwOffset: frOffset,
					dwLength: frsize - 8,
					_order: IndexEntryOrder
				})

				frOffset += frsize;
				streamSize += frsize;
			};

			this.moviLIST.dwSize = streamSize + 4; // + 'movi'

			// stream header

			var frameDu = Math.floor(RateBase / this.movieDesc.fps);
			var strh = MotionJPEGBuilder.createStreamHeader();
			strh.wRight  = this.movieDesc.w;
			strh.wBottom = this.movieDesc.h;
			strh.dwLength = this.frameList.length;
			strh.dwScale  = frameDu;

			var bi = MotionJPEGBuilder.createBitmapHeader();
			bi.dwWidth  = this.movieDesc.w;
			bi.dwHeight = this.movieDesc.h;
			bi.dwSizeImage = 3 * bi.dwWidth * bi.dwHeight;

			var strf = MotionJPEGBuilder.createStreamFormat();
			strf.dwSize = bi.dwSize;
			strf.sContent = bi;

			var strl = MotionJPEGBuilder.createStreamHeaderLIST();
			strl.dwSize = 4 + (strh.dwSize + 8) + (strf.dwSize + 8);
			strl.aList = [strh, strf];

			// AVI Header
			var avih = MotionJPEGBuilder.createAVIMainHeader();
			avih.dwMicroSecPerFrame = frameDu;
			avih.dwMaxBytesPerSec = this.movieDesc.maxJPEGSize * this.movieDesc.fps;
			avih.dwTotalFrames = this.frameList.length;
			avih.dwWidth  = this.movieDesc.w;
			avih.dwHeight = this.movieDesc.h;
			avih.dwSuggestedBufferSize = 0;

			var hdrlSize = 4;
			hdrlSize += avih.dwSize + 8;
			hdrlSize += strl.dwSize + 8;
			this.headerLIST.dwSize = hdrlSize;
			this.headerLIST.aData = [avih, strl];

			var indexChunk = {
				chFourCC: 'idx1',
				dwSize: frameIndices.length * 16,
				aData: frameIndices,
				_order: ['chFourCC', 'dwSize', 'aData']
			};

			// AVI Container
			var aviSize = 0;
			aviSize += 8 + this.headerLIST.dwSize;
			aviSize += 8 + this.moviLIST.dwSize;
			aviSize += 8 + indexChunk.dwSize;

			this.avi.dwSize = aviSize + 4;
			this.avi.aData = [this.headerLIST, this.moviLIST, indexChunk];

			this.build(onFinish);
		},

		build: function(onFinish) {
			var data = {blob: new Blob([], {type:'video/avi'})}
      MotionJPEGBuilder.appendStruct(data, this.avi);
			var blob = data.blob;
			var U = window.URL || window.webkitURL;
			if (U) {
				var burl = U.createObjectURL(blob);
				if (burl) {
					onFinish(burl);
					return;
				}
			}

			var fr = new FileReader();
			fr.onload = function(){ onFinish(fr.result); };
			fr.readAsDataURL(blob);
		}
	};

	var _abtempDWORD = new ArrayBuffer(4);
	var _u8tempDWORD = new Uint8Array(_abtempDWORD);

	var _abtempWORD = new ArrayBuffer(2);
	var _u8tempWORD = new Uint8Array(_abtempWORD);

	var _abtempBYTE = new ArrayBuffer(1);
	var _u8tempBYTE = new Uint8Array(_abtempBYTE);

	MotionJPEGBuilder.appendStruct = function(data, s, nest) {
		nest = nest || 0;
		if (!s._order) {
			throw "Structured data must have '_order'";
		}

		var od = s._order;
		var len = od.length;
		for (var i = 0;i < len;i++) {
			var fieldName = od[i];
			var val = s[fieldName];
			if (Verbose) {
				console.log("          ".substring(0,nest) + fieldName);
			}
			switch(fieldName.charAt(0)) {
			case 'b': // BYTE
				_u8tempBYTE[0] = val;
				data.blob = new Blob([data.blob,_abtempBYTE], {type:'video/avi'});
				break
			case 'c': // chars
	   		data.blob = new Blob([data.blob,val], {type:'video/avi'});
				break;
			case 'd': // DWORD
				_u8tempDWORD[0] =  val        & 0xff;
				_u8tempDWORD[1] = (val >> 8)  & 0xff;
				_u8tempDWORD[2] = (val >> 16) & 0xff;
				_u8tempDWORD[3] = (val >> 24) & 0xff;
				data.blob = new Blob([data.blob,_abtempDWORD], {type:'video/avi'});
				break;
			case 'w': // WORD
				_u8tempWORD[0] =  val        & 0xff;
				_u8tempWORD[1] = (val >> 8)  & 0xff;
				data.blob = new Blob([data.blob,_abtempDWORD], {type:'video/avi'});
				break
			case 'W': // WORD(BE)
				_u8tempWORD[0] = (val >> 8)  & 0xff;
				_u8tempWORD[1] =  val        & 0xff;
				data.blob = new Blob([data.blob,_abtempDWORD], {type:'video/avi'});
				break
			case 'a': // Array of structured data
				var dlen = val.length;
				for (var j = 0;j < dlen;j++) {
					MotionJPEGBuilder.appendStruct(data, val[j], nest+1);
				}
				break;
			case 'r': // Raw(ArrayBuffer)
			  data.blob = new Blob([data.blob,val], {type:'video/avi'});
				break;
			case 's': // Structured data
				MotionJPEGBuilder.appendStruct(data, val, nest+1);
				break;
			case 'h': // Handler function
				val(data);
				break;
			default:
				throw "Unknown data type: "+fieldName;
				break;
			}
		}
	};

	MotionJPEGBuilder.createAVIStruct = function() {
		return {
			chRIFF: 'RIFF',
			chFourCC: 'AVI ',
			dwSize: 0,
			aData: null,
			_order: ['chRIFF', 'dwSize', 'chFourCC', 'aData']
		};
	};

	MotionJPEGBuilder.createAVIMainHeader = function() {
		return {
			chFourCC: 'avih',
			dwSize: 56,
			// -----
			dwMicroSecPerFrame: 66666,
			dwMaxBytesPerSec: 1000,
			dwPaddingGranularity: 0,
			dwFlags: AVIF_HASINDEX,
			// +16

			dwTotalFrames: 1,
			dwInitialFrames: 0,
			dwStreams: 1,
			dwSuggestedBufferSize: 0,
			// +32

			dwWidth: 10,
			dwHeight: 20,
			dwReserved1: 0,
			dwReserved2: 0,
			dwReserved3: 0,
			dwReserved4: 0,
			// +56

			_order: [
				'chFourCC', 'dwSize',
				'dwMicroSecPerFrame', 'dwMaxBytesPerSec', 'dwPaddingGranularity', 'dwFlags',
				'dwTotalFrames', 'dwInitialFrames', 'dwStreams', 'dwSuggestedBufferSize',
				'dwWidth', 'dwHeight', 'dwReserved1', 'dwReserved2', 'dwReserved3', 'dwReserved4'
			]
		};
	};

	MotionJPEGBuilder.createHeaderLIST = function() {
		return {
			chLIST: 'LIST',
			dwSize: 0,
			chFourCC: 'hdrl',
			aData: null,
			_order: ['chLIST', 'dwSize', 'chFourCC', 'aData']
		};
	};

	MotionJPEGBuilder.createMoviLIST = function() {
		return {
			chLIST: 'LIST',
			dwSize: 0,
			chFourCC: 'movi',
			aStreams: null,
			_order: ['chLIST', 'dwSize', 'chFourCC', 'aStreams']
		};
	};

	MotionJPEGBuilder.createMoviStream = function() {
		return {
			chType: '00dc',
			dwSize: 0,
			handler: null,
			_order: ['chType', 'dwSize', 'handler']
		}
	};

	MotionJPEGBuilder.createStreamHeaderLIST = function() {
		return {
			chLIST: 'LIST',
			dwSize: 0,
			chFourCC: 'strl',
			aList: null,
			_order: ['chLIST', 'dwSize', 'chFourCC', 'aList']
		};
	};

	MotionJPEGBuilder.createStreamFormat = function() {
		return {
			chFourCC: 'strf',
			dwSize: 0,
			sContent: null,
			_order: ['chFourCC', 'dwSize', 'sContent']
		};
	};

	MotionJPEGBuilder.createStreamHeader = function() {
		return {
			chFourCC: 'strh',
			dwSize: 56,
			chTypeFourCC: 'vids',
			chHandlerFourCC: 'mjpg',
			// +16

			dwFlags: 0,
			wPriority: 0,
			wLanguage: 0,
			dwInitialFrames: 0,
			dwScale: 66666,

			// +32
			dwRate: RateBase,
			dwStart: 0,
			dwLength: 0,
			dwSuggestedBufferSize: 0,
			// +48

			dwQuality: 10000,
			dwSampleSize: 0,
			wLeft: 0,
			wTop: 0,
			wRight: 0,
			wBottom: 0,
			// +64

			_order:[
				 'chFourCC', 'dwSize', 'chTypeFourCC', 'chHandlerFourCC',
				 'dwFlags', 'wPriority', 'wLanguage', 'dwInitialFrames', 'dwScale',
				 'dwRate', 'dwStart', 'dwLength', 'dwSuggestedBufferSize',
				 'dwQuality', 'dwSampleSize', 'wLeft', 'wTop', 'wRight', 'wBottom'
				]
		};
	};

	MotionJPEGBuilder.createBitmapHeader = function() {
		return {
			dwSize:    40,
			dwWidth:   10,
			dwHeight:  20,
			wPlanes:   1,
			wBitcount: 24,
			chCompression: 'MJPG',
			dwSizeImage: 600,
			dwXPelsPerMeter: 0,
			dwYPelsPerMeter: 0,
			dwClrUsed: 0,
			dwClrImportant: 0,
			_order: [
				'dwSize', 'dwWidth', 'dwHeight', 'wPlanes', 'wBitcount', 'chCompression',
				'dwSizeImage', 'dwXPelsPerMeter', 'dwYPelsPerMeter', 'dwClrUsed', 'dwClrImportant'
			]
		}
	};


	MotionJPEGBuilder.createMJPEG = function() {
		return {
			W_SOI: 0xffd8,
			aSegments: null,
			W_EOI: 0xffd9,
			_order: ['dwSOI', 'aSegments', 'dwEOI']
		};
	};

	MotionJPEGBuilder.KnownMarkers = {
		0xC0: 'SOF0',
		0xC4: 'DHT',
		0xDA: 'SOS',
		0xDB: 'DQT',
		0xDD: 'DRI',
		0xE0: 'APP0'
	};

	function JPEGScanner(sourceArrayBuffer) {
		this.headerSegments = [];
		this.DHTs = [];
		this.DQTs = [];
		this.nameMap = {};
		if (!sourceArrayBuffer) {
			return this;
		}

		var a  = new Uint8Array(sourceArrayBuffer);
		var len = a.length;
		var i = 0;
		var markerID;

		for (;;) {
			if (a[i] != 0xFF) {
				throw "Bad JFIF! at +"+i;
			}

			markerID = a[i+1];
			switch(markerID) {
			case 0xD8:
				// do nothing
				break;

			case 0xC0:
			case 0xC4:
			case 0xDA:
			case 0xDB:
			case 0xDD:
			case 0xE0:
			case 0xE2:
				var segSize = (a[i+2] << 8) | a[i+3];
				var segName = MotionJPEGBuilder.KnownMarkers[markerID] || null;
				var handlerName = 'readSeg' + segName;
				if (Verbose) {
					console.log(segName, segSize);
				}
				var segData = this[handlerName] (a, i+2, segSize);
				segData.W_Marker = 0xff00 | markerID;
				this.headerSegments.push(segData);
				if (markerID == 0xC4) {
					this.DHTs.push(segData);
				} else if (markerID == 0xDB) {
					this.DQTs.push(segData);
				}

				this.nameMap[segName] = segData;

				i += segSize;
				if (markerID == 0xDA) {
					// After SOS; Here is compressed image.
					this.dataSegment = this.readImageData(a, i+2);
					return this;
				}

				break;

			default:
				throw "Bad Marker! at +"+(i+1);
				break;
			}

			i += 2;
		}
	}

	JPEGScanner.prototype = {
		generateDummyDRI: function() {
			return {
				W_Marker: 0xFFDD,
				W_Size: 4,
				W_MCU:  0,
				_order: ['W_Marker', 'W_Size', 'W_MCU']
			};
		},

		generateCombinedDQT: function() {
			var seg = {
				W_Marker: 0xFFDB,
				W_Size:   2,
				aTables: null,
				_order: ['W_Marker', 'W_Size', 'aTables']
			};

			var i, dqt;
			var count = this.DQTs.length;
			var allSize = 0;
			seg.aTables = [];
			for (i = 0;i < count;i++) {
				dqt = this.DQTs[i];
				allSize += dqt.W_Size - 2;
				var innerCount = dqt.aTables.length;
				for (var j = 0;j < innerCount;j++) {
					seg.aTables.push({
						'bPT': dqt.aTables[j].bPT,
						'rawTable': dqt.aTables[j].rawTable,
						_order: ['bPT', 'rawTable']
					});
				}
			}

			seg.W_Size += allSize;
			return seg;
		},

		generateCombinedDHT: function() {
			var seg = {
				W_Marker: 0xFFE2,
				W_Size:   2,
				rawTable: null,
				_order: ['W_Marker', 'W_Size', 'rawTable']
			};

			var i, dht;
			var count = this.DHTs.length;
			var combinedTblLen = 0;
			var tblLen;
			for (i = 0;i < count;i++) {
				dht = this.DHTs[i];
				tblLen = dht.W_Size - 2;
				combinedTblLen += tblLen;
			}

			var ab = new ArrayBuffer(combinedTblLen);
			var u8 = new Uint8Array(ab);
			var pos = 0;
			for (i = 0;i < count;i++) {
				dht = this.DHTs[i];
				tblLen = dht.W_Size - 2;
				u8[pos++] = dht.bType;
				for (var j = 0;j < (tblLen-1);j++) {
					var u8Tbl = new Uint8Array(dht.rawTable);
					u8[pos++] = u8Tbl[j];
				}
			}

			seg.W_Size   += combinedTblLen;
			seg.rawTable =  ab;
			return seg;
		},

		readImageData: function(a, offset) {
			var len = a.length - offset;
			var ab = new ArrayBuffer(len);
			var u8 = new Uint8Array(ab);
			for (var i = 0;i < len;i++) {
				u8[i] = a[offset + i];
			}

			return ab;
		},

		readRaw: function() {
		},

		readSegAPP0: function(a, offset, segSize) {
			return {
				W_Marker:  0,
				W_Size:    segSize,
				chJFIF:    readU8AsChars(  a, offset+2, 4),
				bZero:     readU8AsByte(   a, offset+6),
				bMajorRev: readU8AsByte(   a, offset+7),
				bMinorRev: readU8AsByte(   a, offset+8),
				bUnits:    readU8AsByte(   a, offset+9),
				W_XDensity: readU8AsBEWORD(a, offset+10),
				W_YDensity: readU8AsBEWORD(a, offset+12),
				bThumbnailWidth:  readU8AsByte(a, offset+14),
				bThumbnailHeight: readU8AsByte(a, offset+15),
				_order: [
					'W_Marker', 'W_Size', 'chJFIF', 'bZero', 'bMajorRev', 'bMinorRev',
					'bUnits', 'W_XDensity', 'W_YDensity', 'bThumbnailWidth', 'bThumbnailHeight'
				]
			};
		},

		readSegDQT: function(a, offset, segSize) {
			var readSize = 2;
			var seg = {
				W_Marker:  0,
				W_Size:   segSize,
				aTables:  [],
				_order: ['W_Marker', 'W_Size', 'aTables']
			};

			offset += 2;

			function readTables(ls) {
				var PT =  readU8AsByte(a, offset++);
				++readSize;

				var qlen = 64;
				var q_ab = new ArrayBuffer(qlen);
				var q_u8 = new Uint8Array(q_ab);
				for (var i = 0;i < qlen;i++) {
					q_u8[i] = a[offset++];
					++readSize;
				}

				ls.push({
					bPT: PT,
					rawTable: q_ab,
					_order: ['bPT', 'rawTable']
				});
			}

			for (;readSize < segSize;) {
				readTables(seg.aTables);
			}

			return seg;
		},

		readSegSOF0: function(a, offset, segSize) {
			var seg = {
				W_Marker: 0,
				W_Size: segSize,
				bDataPrecision: readU8AsByte(a, offset+2),
				W_PicHeight:    readU8AsBEWORD(a, offset+3),
				W_PicWidth:     readU8AsBEWORD(a, offset+5),
				bNComponents:   readU8AsByte(a, offset+7),
				aComponents: [],
				_order: ['W_Marker', 'W_Size', 'bDataPrecision',
				         'W_PicHeight', 'W_PicWidth', 'bNComponents', 'aComponents']
			};

			offset += 8;
			function readComponent(ls) {
				ls.push({
					b1: readU8AsByte(a, offset  ),
					b2: readU8AsByte(a, offset+1),
					b3: readU8AsByte(a, offset+2),
					_order: ['b1','b2','b3']
				});

				offset += 3;
			}

			for (var i = 0;i < seg.bNComponents;i++) {
				readComponent(seg.aComponents);
			}

			return seg;
		},

		readSegSOS: function(a, offset, segSize) {
			var seg = {
				W_Marker: 0,
				W_Size: segSize,
				bNComponents: readU8AsByte(a, offset+2),
				aComponents: [],
				bReserved1: 0x00,
				bReserved2: 0x3F,
				bReserved3: 0x00,
				_order: ['W_Marker', 'W_Size', 'bNComponents', 'aComponents',
				         'bReserved1', 'bReserved2', 'bReserved3']
			};

			offset += 3;
			for (var i = 0;i < seg.bNComponents;i++) {
				seg.aComponents.push({
					bNo: readU8AsByte(a, offset),
					bACDC: readU8AsByte(a, offset+1),
					_order: ['bNo', 'bACDC']
				})

				offset += 2;
			}

			return seg;
		},

		readSegDHT: function(a, offset, segSize) {
			var seg = {
				W_Marker: 0,
				W_Size: segSize,
				bType: readU8AsByte(a, offset+2),
				rawTable: null,
				_order: ['W_Marker', 'W_Size', 'bType', 'rawTable']
			};

			offset += 3;
			var tsize = segSize - 3;
			var t_ab = new ArrayBuffer(tsize);
			var t_u8 = new Uint8Array(t_ab);
			for (var i = 0;i < tsize;i++) {
				t_u8[i] = a[offset++];
			}

			seg.rawTable = t_ab;
			return seg;
		},

		emit: function() {
			var fileStruct = {
				W_SOI: 0xffd8,
				aHeaders: this.headerSegments,
				rawImage: this.dataSegment,
				_order: ['W_SOI', 'aHeaders', 'rawImage']
			};

			var data = {blob: newBlob([], {type:'video/avi'})};

			MotionJPEGBuilder.appendStruct(data, fileStruct);
			return data.blob;
		},

		generateForAVI: function() {
			var j = new JPEGScanner();
			var app0 = this.nameMap['APP0'];
			var sof0 = this.nameMap['SOF0'];
			var sos = this.nameMap['SOS'];
			function ModifiedAPP0() {}
			ModifiedAPP0.prototype = app0;

			var app0m = new ModifiedAPP0();
			app0m.chJFIF = 'AVI1';
			app0m.bMajorRev = 0;
			app0m.bMinorRev = 0;

			j.headerSegments.push(app0m);
			j.headerSegments.push(this.generateDummyDRI());
			j.headerSegments.push(this.generateCombinedDQT());
			j.headerSegments.push(sof0);
			j.headerSegments.push(this.generateCombinedDHT());
			j.headerSegments.push(sos);
			j.dataSegment = this.dataSegment;

			return j;
		}
	};

	function readU8AsBEWORD(a, pos) {
		return (a[pos] << 8) | a[pos+1];
	}

	function readU8AsByte(a, pos) {
		return a[pos];
	}

	function readU8AsChars(a, pos, count) {
		var chrs = new Array(count);
		for (var i = 0;i < count;i++) {
			chrs[i] = String.fromCharCode(a[pos+i]);
		}

		return chrs.join('');
	}

	var Base64 = function() {
		this.initialize();
	};

	Base64.prototype.initialize = function() {
		this.symbols = [];
		var startChar = "A".charCodeAt(0);
		for(var i = 0; i < 26; i++) {
			this.symbols.push(String.fromCharCode(startChar + i));
		}
		var startChar = "a".charCodeAt(0);
		for(var i = 0; i < 26; i++) {
			this.symbols.push(String.fromCharCode(startChar + i));
		}
		var startChar = "0".charCodeAt(0);
		for(var i = 0; i < 10; i++) {
			this.symbols.push(String.fromCharCode(startChar + i));
		}
		this.symbols.push("+", "/");

		this.encodeMap = [];
		for(var i = 0; i < this.symbols.length; i++) {
			this.encodeMap[i] = this.symbols[i];
		}

		this.decodeMap = [];
		for(var i = 0; i < this.symbols.length; i++) {
			this.decodeMap[this.symbols[i]] = i;
		}
		this.decodeMap["="] = null;
	};


	Base64.prototype.decode = function(encoded) {
		if(encoded.length % 4 != 0) {
			throw "encoded.length must be a multiple of 4.";
		}

		var decoded = [];
		var map = this.decodeMap;
		for (var i = 0, len = encoded.length; i < len; i += 4) {
			var b0 = map[encoded[i]];
			var b1 = map[encoded[i + 1]];
			var b2 = map[encoded[i + 2]];
			var b3 = map[encoded[i + 3]];

			var d0 = ((b0 << 2) + (b1 >> 4)) & 0xff;
			decoded.push(d0);

			if(b2 == null) break; // encoded[i + 1] == "="

			var d1 = ((b1 << 4) + (b2 >> 2)) & 0xff;
			decoded.push(d1);

			if(b3 == null) break; // encoded[i + 2] == "="

			var d2 = ((b2 << 6) + b3) & 0xff;
			decoded.push(d2);

		}

		return decoded;
	};


	// export
	aGlobal.movbuilder = {
		MotionJPEGBuilder: MotionJPEGBuilder
	};
})(window);
