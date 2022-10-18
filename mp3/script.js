/**
         * 1. Render songs
         * 2.scroll top
         * 3. Play / Pause / seek
         * 4. Cd rotate
         * 5. Next / prev
         * 6. Random
         * 7. Next / Repeat when ended
         * 8. Active song
         * 9. Scroll active song into view
         * 10. Play song when click
         * 11. voice
         * 12. search song
         * 13. creat
         * 14. delete
         * 15. update
         * ....
         */

        const $ = document.querySelector.bind(document)
        const $$ = document.querySelectorAll.bind(document)

        const PLAYER_STORAGE_KEY = 'F8_PLAYER'

        const player = $('.player')
        const heading = $('header h2')
        
        const cdThumb = $('.cd-thumb')
        const audio = $('#audio')
        const playBtn = $('.btn-toggle-play')
        const progress= $('#progress1')
        const cdYhumb= $('.cd-thumb')
        
        const prev = $('.btn-prev')
        const next = $('.btn-next')
        const randomBtn = $('.btn-random')
        const repeatBtn = $('.btn-repeat')
        
        const playlist = $('.playlist')
        
        // bien bieu dien the volume input
        const volumeBtn = $('.volume')
        //bien bieu dien anh volume
        const volumesong = $('.volume-song')
        // bien bieu dien cho the  search input
        const searchBtn = $('.myInfo')
        // bien luu gia tri am thanh bai hat
        let beginVolume;
        // bien xu ly so giay, mac dinh 0
        let seconds = 0;
        // bien xu ly so phut, mac dinh 0
        let minutes = 0;
        


        const app = {
            isClock: false,
            isStartVolume: 1,
            currenIndex: 0,
            isRepeat: false,
            isRandom: false,
            isPlaying: false,
            Volume: false,
            config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
            songs: [
                {
                    id: 0,
                    name: 'Tôi đi lang thang',
                    singer: 'Đen vâu - Vũ Đinh Trọng Thắng',
                    path: 'https://tainhacmienphi.biz/get/song/api/38151',
                    image: 'https://avatar-ex-swe.nixcdn.com/song/2020/09/03/9/e/8/4/1599130246936.jpg',
                    time: 258
                },
                {
                    id: 1,
                    name: 'Muộn Rồi Mà Sao Còn',
                    singer: 'Sơn Tùng M-TP',
                    path: 'https://tainhac123.com/listen/muon-roi-ma-sao-con-son-tung-m-tp.6nAqBAZ3nxuV.html',
                    image: 'https://avatar-nct.nixcdn.com/song/2021/04/29/9/1/f/8/1619691182261.jpg',
                    time: 275
                },
                {
                    id: 2,
	                name: 'Build A Bitch',
                    singer: 'Ana Whiterose',
                    path: 'https://tainhac123.com/listen/build-a-bitch-bella-poarch.CVBhKMXcO3Dx.html',
                    image: 'https://avatar-nct.nixcdn.com/song/2021/05/17/8/6/3/c/1621240003974.jpg',
                    time: 122
                },
                {
                    id: 3,
                    name: 'Nàng Thơ',
                    singer: 'Hoàng Dũng',
                    path: 'https://tainhac123.com/listen/nang-tho-hoang-dung.Kx3Kbih0rS5z.html',
                    image: 'https://avatar-nct.nixcdn.com/song/2020/07/31/c/5/8/9/1596188259603.jpg',
                    time: 254
                },
                {
                    id: 4,
                    name: 'Quăng Tao Cái Boong ',
                    singer: 'Huỳnh James,Pjnboys,DJ',
                    path: 'https://tainhac123.com/listen/quang-tao-cai-boong-remix-huynh-james-ft-pjnboys-ft-dj.Ouhzkj9WyxEC.html',
                    image: 'https://avatar-nct.nixcdn.com/singer/avatar/2018/03/14/2/f/2/4/1521007851195.jpg',
                    time: 261   
                },
                {
                    id: 5,
                    name: 'Cưới Đi ',
                    singer: '2T,ChangC',
                    path: 'https://tainhac123.com/listen/cuoi-di-2t-ft-changc.wgpNJZxMdoMX.html',
                    image: 'https://avatar-nct.nixcdn.com/song/2020/08/27/8/e/c/f/1598516178659.jpg',
                    time: 232
                },
                {
                    id: 6,
                    name: 'Mình Cưới Nhau Đi',
                    singer: 'Huỳnh James,Pjnboys',
                    path: 'https://tainhac123.com/listen/minh-cuoi-nhau-di-huynh-james-ft-pjnboys.QU0ByG99EQtd.html',
                    image: 'https://avatar-nct.nixcdn.com/song/2018/02/03/9/c/7/5/1517658801202.jpg',
                    time: 235
                },
                {
                    id: 7,
                    name: 'Cua',
                    singer: 'HIEUTHUHAI,MANBO',
                    path: 'https://tainhac123.com/listen/cua-hieuthuhai-ft-manbo.Qi05HukzWDZ7.html',
                    image: 'https://avatar-nct.nixcdn.com/song/2020/07/29/5/7/4/a/1596008023819.jpg',
                    time: 193
                },
                {
                    id: 8,
                    name: 'Tâm Ma (Tâm Ma OST)',
                    singer: ' Thái Vũ (BlackBi),Võ Đình Hiếu,Elbi',
                    path: 'https://tainhac123.com/listen/tam-ma-tam-ma-ost-thai-vu-blackbi-ft-vo-dinh-hieu-ft-elbi.UzJA9Hi5fmoo.html',
                    image: 'https://avatar-nct.nixcdn.com/song/2018/09/14/c/0/1/f/1536910933648.jpg',
                    time: 270
                },
                {
                    id: 9,
                    name: '05 (Không Phai)',
                    singer: 'Tăng Duy Tân,T.R.I',
                    path: 'https://tainhac123.com/listen/05-khong-phai-tang-duy-tan-ft-tri.dzHvmaOAxTMv.html',
                    image: 'https://avatar-nct.nixcdn.com/singer/avatar/2018/05/21/c/1/a/3/1526870892871.jpg',
                    time: 189
                },
            ],
            setConfig: function(key , value) {
                this.config[key] = value;
               localStorage.setItem(PLAYER_STORAGE_KEY , JSON.stringify(this.config))
            },
            render() {
                const htmls = this.songs.map((song,index)=>{
                    return `
                    <div class="song  ${index === this.currenIndex ? 'active' : ''} item-${index}" data-index='${index}'  >
                        <div class="thumb"
                            style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p clsss="author">${song.singer}</p>
                        </div>
                        <div class="options">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
                    `
                })
                playlist.innerHTML = htmls.join('')
            },
            defineProperties() {
                Object.defineProperty(this, 'currentSong',{
                    get() {
                        return this.songs[this.currenIndex]
                    }
                })
            },
            handleEvents: function() {
                const _this = this
                const cd= $('.cd')
                const cdWidth = cd.offsetWidth
                
                //xu ly cd quay/dung
                const cdThumbAnimate = cdThumb.animate([
                    {transform: 'rotate(360deg)'}
                ],{
                    duration:10000,//10 seconds
                    iterations: Infinity
                })
                cdThumbAnimate.pause()
              
                // xu ly phong to/thu nho cd
                document.onscroll = function() {
                    const scrollTop = window.scrollY || document.documentElement.scrollTop
                    const newCdWidth = cdWidth - scrollTop
                    cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : '0px'
                    cd.style.opacity =  newCdWidth / cdWidth
                }
                
                //xu ly khi click play
                playBtn.onclick = function() {
                    if(_this.isPlaying) {
                        audio.pause()
                        
                    } else {
                        audio.play()
                    }
                }    
               
                //khi song duoc play
                audio.onplay = function() {
                    _this.isClock = true
                    setTimeout(clockSong,1000)
                    
                    _this.isPlaying = true
                    player.classList.add('playing')
                  
                    cdThumbAnimate.play()
                  
                    audio.volume = _this.config.isVolume
                    
                    beginVolume = audio.volume
                    audio.addEventListener('timeupdate',ontimeupdate2)
                    // luu bai hat dang nghe
                    let object = {
                        name: _this.currentSong.name ,
                        picture: `url('${_this.currentSong.image}')` ,
                        link: _this.currentSong.path,
                        id: _this.currentSong.id
                    }
                    _this.setConfig('isSong',object)
                    
                    
                }
                
                //khi song duoc pause
                audio.onpause = function() {
                    _this.isClock = false
                    _this.isPlaying = false
                    player.classList.remove('playing')
                    cdThumbAnimate.pause();
                }
                //khi tien do bai hat thay doi
                function ontimeupdate() {
                    _this.setConfig('isDuration',Math.floor(audio.duration))
                    if(audio.duration) {
                        const progressTime = Math.floor(audio.currentTime/audio.duration * 100)
                        progress.value = progressTime
                        
                    }
                    onTime()
                }
                audio.addEventListener('timeupdate',ontimeupdate)
                
                
                
                // xu ly khi tua song on computer
                
                progress.addEventListener('mousedown',onmousedown2)
                //xu ly su kien nhap chuot
                function onmousedown2(event) {
                    progress.addEventListener('mousemove',onmousemove2)
                    progress.addEventListener('mouseup',onmouseup2)
                    audio.removeEventListener('timeupdate',ontimeupdate)
                }
                //xu ly su kien khi keo chuot tua song
                function onmousemove2() {
                    
                }
                //xu ly su kien khi tha chuot 
                function onmouseup2(e) {
                    const progressSeconds = e.target.value /100 * audio.duration
                    audio.currentTime = progressSeconds
                    
                    // xu ly thoi gian Song khi tua
                    if(audio.currentTime >= 60) {
                        seconds = Math.floor(audio.currentTime % 60)
                        minutes = Math.floor(audio.currentTime / 60)
                        if((seconds % 60) < 10) {
                            $('#time').innerText = '0' + Math.floor(minutes) + ':' + '0' + Math.floor(seconds)
                        } else {
                            $('#time').innerText = '0' + Math.floor(minutes) + ':' + Math.floor(seconds)
                        } 
                        
                    } else {
                        seconds = Math.floor(audio.currentTime)
                        minutes = Math.floor(audio.currentTime / 60)
                        if((seconds % 60) < 10) {
                            $('#time').innerText = '0' + Math.floor(minutes) + ':' + '0' + Math.floor(seconds)
                        } else {
                            $('#time').innerText = '0' + Math.floor(minutes) + ':' + Math.floor(seconds)
                        } 

                    }
                    progress.removeEventListener('mousehmove',onmousemove2)
                    audio.addEventListener('timeupdate', ontimeupdate)
                }

                //xu ly tua  Song tren smartphone
                // xu ly khi tua song
                
                progress.addEventListener('touchstart',ontouchstart2)
                //xu ly su kien cham vao tua bai hat
                function ontouchstart2(event) {
                    progress.addEventListener('touchmove',ontouchmove2)
                    progress.addEventListener('touchend',ontouchend2)
                    audio.removeEventListener('timeupdate',ontimeupdate)
                }
                //xu ly su kien khi cham keo tua song
                function ontouchmove2() {
                    
                }
                //xu ly su kien khi tha tay khoi dien thoai 
                function ontouchend2(e) {
                    const progressSeconds = e.target.value /100 * audio.duration
                    audio.currentTime = progressSeconds
                    
                    // xu ly thoi gian Song khi tua
                    if(audio.currentTime >= 60) {
                        seconds = Math.floor(audio.currentTime % 60)
                        minutes = Math.floor(audio.currentTime / 60)
                        if((seconds % 60) < 10) {
                            $('#time').innerText = '0' + Math.floor(minutes) + ':' + '0' + Math.floor(seconds)
                        } else {
                            $('#time').innerText = '0' + Math.floor(minutes) + ':' + Math.floor(seconds)
                        } 
                        
                    } else {
                        seconds = Math.floor(audio.currentTime)
                        minutes = Math.floor(audio.currentTime / 60)
                        if((seconds % 60) < 10) {
                            $('#time').innerText = '0' + Math.floor(minutes) + ':' + '0' + Math.floor(seconds)
                        } else {
                            $('#time').innerText = '0' + Math.floor(minutes) + ':' + Math.floor(seconds)
                        } 

                    }
                    progress.removeEventListener('touchmove',ontouchmove2)
                    audio.addEventListener('timeupdate', ontimeupdate)
                }





                //xu ly khi next song
                next.onclick = function() {
                    if(_this.isRandom) {
                        _this.playRandom()
                    } else {
                        _this.nextSong()
                    }
                    
                    _this.isClock = false

                    $('#time').innerText ='00:00'
                    progress.value = 0
                    setTimeout(function(){
                        seconds = 0;
                        minutes = 0;
                        audio.play()
                    },1000)
                    _this.render()
                    _this.scrollTopActive()
                    
                }
                // xu ly khi prev song
                prev.onclick =function() {
                    if(_this.isRandom) {
                        _this.playRandom()
                    } else{
                        _this.prevSong()
                    }

                    _this.isClock = false
                    $('#time').innerText ='00:00'
                    progress.value = 0
                    setTimeout(function(){
                        seconds = 0;
                        minutes = 0;
                        audio.play()
                    },1000)
                    _this.render()
                    _this.scrollTopActive()
                }
                // xu ly khi random song
                randomBtn.onclick = function() {
                    _this.isRandom = !_this.isRandom
                    _this.setConfig('isRandom', _this.isRandom)
                    randomBtn.classList.toggle('active', _this.isRandom)
                }
                //xu ly khi click repeat
                repeatBtn.onclick = function() {
                    _this.isRepeat = !_this.isRepeat
                    _this.setConfig('isRepeat',_this.isRepeat)
                    repeatBtn.classList.toggle('active', _this.isRepeat)
                }
                // xu ly next khi het song
                audio.onended = function() {
                    if(_this.isRepeat) {
                         _this.isClock = false
                        $('#time').innerText ='00:00'
                        progress.value = 0
                        setTimeout(function(){
                        seconds = 0;
                        minutes = 0;
                        audio.play()
                        },1000)
                    } else {
                        $('#time').innerText = '00:00'
                        progress.value = 0
                        seconds = 0;
                        minutes =0;
                        next.click()
                    }
                    
                }
               

                //lang nghe hanh vi click vao playlist
                playlist.onclick = function(e) {
                    const songNode =e.target.closest('.song:not(.active)') 
                    const optionsNode = e.target.closest('.options')
                    if( songNode || optionsNode ) {
                       // xu ly khi click vao song
                        if(songNode) {
                            //$('.song.active').classList.remove('active')
                           _this.currenIndex = Number(songNode.dataset.index)
                            //songNode.classList.add('active')             
                           // _this.currenIndex = songNode.dataset.index//.getAttribute('data-index')
                            _this.loadSong()
                            _this.render()
                            _this.isClock = false
                            $('#time').innerText = '00:00'
                            setTimeout(function(){
                                seconds = 0;
                                minutes = 0;
                                audio.play()
                            },1000)
                        }
                       //xu ly khi click vao options
                       if(optionsNode) {

                       }
                    }
                }
                
                
                
                   
                    
                    
                
                    
                
                
                // dieu chinh am luong song tren dien thoai

                volumeBtn.addEventListener('touchstart',ontouchstart)
                //xu ly su kien cham cua dien thoa
                function ontouchstart() {
                    volumeBtn.addEventListener('touchmove',ontouchmove)
                    volumeBtn.addEventListener('touchend',ontouchend)
                }
                //xu ly su kien khi keo bang dien thoai
                function ontouchmove() {
                    $('#volume-number').innerText = volumeBtn.value
                    audio.volume = volumeBtn.value/100
                    beginVolume = audio.volume
                    //luu gia tri am thanh khi thay doi
                    _this.setConfig('isVolume',audio.volume)
                    // luu gia tri am thanh khi thay doi
                    _this.setConfig('isVolumeAfter',audio.volume)
                }
                //xu ly su kien khi tha tay khoi dien thoai
                function ontouchend() {
                    volumeBtn.removeEventListener('touchmove',ontouchmove)
                }


                // xu ly dieu chinh am thanh tren may tinh
                volumeBtn.addEventListener('mousedown',onmousedown)
                //xu ly su kien nhap chuot
                function onmousedown() {
                    volumeBtn.addEventListener('mousemove',mousemove)
                    volumeBtn.addEventListener('mouseup',onmouseup)
                }
                //xu ly su kien khi keo chuot
                function mousemove() {
                    $('#volume-number').innerText = volumeBtn.value
                    audio.volume = volumeBtn.value/100
                    beginVolume = audio.volume
                    _this.setConfig('isVolume',audio.volume)
                    _this.setConfig('isVolumeAfter',audio.volume)
                }
                //xu ly su kien khi tha chuot
                function onmouseup() {
                    volumeBtn.removeEventListener('mousemove',mousemove)
                }
                
                //xu ly su kien khi thay doi am thanh khi click
                volumeBtn.onchange = function() {
                    $('#volume-number').innerText = volumeBtn.value
                    audio.volume = volumeBtn.value/100
                    _this.setConfig('isVolume',audio.volume)
                        beginVolume = audio.volume
                    _this.setConfig('isVolumeAfter',audio.volume)
                }

                //xu ly am thanh khi click bieu tuong
                volumesong.onclick = function() {
                    // xu ly code khi click roi thoat app
                    if(_this.config.isVolumeStart === true) {
                        if(!_this.isVolume) {
                            _this.isVolume = true
                            // nhan gia tri am thanh de xu ly
                            if(beginVolume) {
                                audio.volume = beginVolume
                                volumeBtn.value = beginVolume*100
                            } else {
                                audio.volume = _this.config.isVolumeAfter
                                volumeBtn.value = _this.config.isVolumeAfter*100
                            }

                            $('#volume-number').innerText = volumeBtn.value
                            // luu gia tri am thanh
                            _this.setConfig('isVolume',audio.volume)
                        } else {
                            _this.isVolume = false
                            audio.volume = 0
                            volumeBtn.value = 0
                            $('#volume-number').innerText = volumeBtn.value
                            // luu gia tri am thanh
                            _this.setConfig('isVolume',audio.volume)
                        }

                    } else {
                        //xu ly binh thuong
                        if(_this.Volume) {
                            _this.Volume = false
                            //luu gia tri _this.isVolume khi co nguoi click bieu tuong
                            _this.setConfig('isVolumeStart',_this.Volume)
                            // nhan gia tri am thanh de xu ly
                            if(beginVolume) {
                                audio.volume = beginVolume
                                volumeBtn.value = beginVolume*100
                            } else {
                                audio.volume = _this.config.isVolumeAfter
                                volumeBtn.value = _this.config.isVolumeAfter*100
                            }
                            $('#volume-number').innerText = volumeBtn.value
                            // luu gia tri am thanh
                            _this.setConfig('isVolume',audio.volume)
                            
                        } else {
                            _this.Volume = true
                            //luu gia tri cua _this.Volume khi co nguoi click bieu tuong
                            _this.setConfig('isVolumeStart',_this.Volume)
                            audio.volume = 0
                            volumeBtn.value = 0
                            $('#volume-number').innerText = volumeBtn.value
                            // luu gia tri am thanh
                            _this.setConfig('isVolume',audio.volume)
                        }
                    }
                    
                    
                }

                
                    
                    


                
                
                //tim kiem song
                searchBtn.onsearch = function() {
                    if(searchBtn.value) {
                        _this.songs.forEach(song => {
                            if(song["name"].toLowerCase().includes(searchBtn.value.toLowerCase())) {
                                _this.currenIndex = song.id
                                _this.loadSong()
                                _this.render()
                                _this.scrollTopActive()
                                _this.isClock = false
                                $('#time').innerText = '00:00'
                                setTimeout(function(){
                                    seconds = 0;
                                    minutes = 0;
                                    audio.play()
                                },1000)
                            }
                        
                        })
                    }
                    searchBtn.value = ''
                }

                
                // hien tong thoi gian cua bai hat
                function onTime() {
                    let phut = Math.floor(_this.currentSong.time / 60)
                    let giay = Math.floor(_this.currentSong.time % 60)
                    if(giay <10) {
                        if(phut < 10) {
                            $('#time-1').innerText = '0' + phut +':'+ '0' + giay
                        } else {
                            $('#time-1').innerText =phut +':'+ '0' + giay
                        } 
                    } else {
                        $('#time-1').innerText = '0' + phut +':'+ giay
                    }
                }
                
                // xu ly thoi gian Song thuc hien tang cho den khi bang thoi luong Song
                if(_this.config.isSeconds) {
                    seconds = Math.floor(_this.config.isSeconds)
                } else {
                    seconds = Math.floor(audio.currentTime)
                }
                
                if(seconds >= 60) {
                    minutes = Math.floor(seconds / 60)
                    seconds = seconds % 60
                }
                
                function clockSong() {
                    if(_this.isClock) {
                        
                        if(seconds <  _this.currentSong.time - 1) {
                            seconds++
                            console.log(seconds)
                            if(seconds % 60 ===0 ) {
                                minutes++
                                console.log(seconds)
                            }
                            if(seconds >=60 ) {
                                seconds = seconds % 60
                            }
                            seconds = seconds < 10 ? '0'+seconds : seconds
                            if(minutes < 10) {
                                $('#time').innerText = '0' + minutes + ':' + seconds
                            } else {
                                $('#time').innerText =  minutes + ':' + seconds
                            }
                            setTimeout(clockSong,1000)
                        } else {
                            minutes = Math.floor(seconds/60)
                            seconds = Math.floor(seconds % 60) + 1
                            progress.value = 100
                            if(seconds < 10) {
                                $('#time').innerText = '0' + minutes +':'+ '0' + seconds
                            } else {
                                $('#time').innerText = '0' + minutes +':' + seconds
                            }
                            _this.isClock = false
                        }
                    }
                }
                

               
                //luu thoi gian dang nghe
                function ontimeupdate2() {
                    if(audio.duration) {
                        seconds = Math.floor(audio.currentTime)
                    }
                    _this.setConfig('isSeconds',seconds)
                }
                
            },
            loadSong: function() {
                
                heading.innerText = this.currentSong.name
                cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
                audio.src= this.currentSong.path
                    
            },
            loadSongWhenOpen: function() {
                
                heading.innerText = this.config.isSong.name
                cdThumb.style.backgroundImage = this.config.isSong.picture
                audio.src = this.config.isSong.link
                this.currenIndex = this.config.isSong.id
                this.render()
                $('.song.active').scrollIntoView()
            },
            loadConfig: function() {
                this.isRandom = this.config.isRandom
                this.isRepeat = this.config.isRepeat
                this.isVolume = this.config.isVolume
               
            },
            nextSong: function() {
                this.currenIndex++
                if(this.currenIndex >= this.songs.length) {
                    this.currenIndex = 0
                }
                this.loadSong()
            },
            prevSong: function() {
                this.currenIndex--
                if(this.currenIndex < 0) {
                    this.currenIndex = this.songs.length -1
                }
                this.loadSong()
            },
            playRandom: function() {
                let newcurrentIndex;
                let check;
                    do{
                        newcurrentIndex = Math.floor(Math.random() * (this.songs.length))
                        check = newcurrentIndex

                    } while(newcurrentIndex === this.currenIndex && newcurrentIndex === check)
                    
                    this.currenIndex = newcurrentIndex
                this.loadSong()
            },
            scrollTopActive() {
                setTimeout(function() {
                    $('.song.active').scrollIntoView({
                        behavior: 'smooth',
                        block: 'end'
                    })
                },500)
                    
            },
            loadClockStart: function() {
                audio.currentTime = this.config.isSeconds
                let startseconds = audio.currentTime
                if(startseconds > 60) {
                    if(startseconds % 60  < 10) {
                        $('#time').innerText = '0' + Math.floor(startseconds /60) + ':' + '0' + Math.floor(startseconds % 60)
                    } else {
                        $('#time').innerText = '0' + Math.floor(startseconds /60) + ':'  + Math.floor(startseconds % 60)
                    }
                    
                } else {
                    if(startseconds <10) {
                        $('#time').innerText = '00'+ ':' + '0' + startseconds
                    } else {
                        $('#time').innerText = '00'+ ':'  + startseconds
                    }
                }
            },
            loadVolumeStart: function() {
                volumeBtn.value = Number(this.config.isVolume) * 100
                $('#volume-number').innerText = volumeBtn.value
                audio.volume = Number(this.config.isVolume)
            },
            handleRepeatAndrandom: function() {
                if(this.isRandom){
                    randomBtn.classList.toggle('active', this.israndom)
                }
                if(this.isRepeat) {
                    repeatBtn.classList.toggle('active', this.isRepeat)
                }
            },
            
            start: function() { 
                

                //gan cau hinh tu config vao ung dung
                this.loadConfig()

                // dinh nghia cac thuoc tinh cho object
                this.defineProperties()

                // lang nghe / xu ly cac su kien
                this.handleEvents()

                //tai thong tin bai hat dau tien vao UI khi chay ung dung
                this.loadSong()

                //chuyen bai hat ke tiep
                this.nextSong()

                // quay lai bai truoc do
                this.prevSong()

               
                //render playlist
                this.render()
        
                //mo bai hat dang nghe
                this.loadSongWhenOpen()
                
                
                //hien thi giay cua Song dang nghe truoc khi tat app
                this.loadClockStart()
                
                
                // hien thi am thanh khi mo app
                this.loadVolumeStart()

               
                //hien thi trang thai bat dau cua repeat va random
                this.handleRepeatAndrandom()
            }
        }

        app.start()