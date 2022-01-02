$('#btn').click(() => {
    $('#btn-div').addClass('animate__animated')
    $('#btn-div').addClass('animate__backOutUp')
    const audio = new Audio("audio.mp3");
    $('#btn-div').fadeOut(1000)
    setTimeout(() => {
        audio.play()

        $('.center').css('display', 'none');
        $('.card-main').css('display', 'flex');
        setTimeout(() => {
            $('.container .card:nth-child(1)').css('display', 'inline-block');
            setTimeout(() => {
                $('.container .card:nth-child(2)').css('display', 'inline-block');
                setTimeout(() => {
                    $('.container .card:nth-child(3)').css('display', 'inline-block');
                    setTimeout(() => {
                        $('.container .card:nth-child(4)').css('display', 'inline-block');
                        setTimeout(() => {
                            $('#nextto3').css('display', 'block')
                        }, 3000)
                    }, 800)
                }, 800)
            }, 800)
        }, 800)
    }, 1000)

})

$('#btnnextto3').click(() => {
    $('#nextto3').fadeOut(1000)
    $('.card-main').fadeOut(1000)
    $('.page_3').fadeIn(1000)
    $('#nextto3').css('display', 'none')
    setTimeout(() => {
        $('.card-main').css('display', 'none');
        $('.page_3').css('display', 'block');
        setTimeout(() => {
            const canvas = document.getElementById("canvas");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            var ctx = canvas.getContext("2d");
            function Firework(x, y, height, yVol, R, G, B) {
                this.x = x;
                this.y = y;
                this.yVol = yVol;
                this.height = height;
                this.R = R;
                this.G = G;
                this.B = B;
                this.radius = 2;
                this.boom = false;
                var boomHeight = Math.floor(Math.random() * 200);
                this.draw = function () {

                    ctx.fillStyle = "rgba(" + R + "," + G + "," + B + ")";
                    ctx.strokeStyle = "rgba(" + R + "," + G + "," + B + ")";
                    ctx.beginPath();
                    //   ctx.arc(this.x,boomHeight,this.radius,Math.PI * 2,0,false);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 3, Math.PI * 2, 0, false);
                    ctx.fill();
                }
                this.update = function () {
                    this.y -= this.yVol;
                    if (this.radius < 20) {
                        this.radius += 0.35;
                    }
                    if (this.y < boomHeight) {
                        this.boom = true;

                        for (var i = 0; i < 120; i++) {
                            particleArray.push(new Particle(
                                this.x,
                                this.y,
                                // (Math.random() * 2) + 0.5//
                                (Math.random() * 2) + 1,
                                this.R,
                                this.G,
                                this.B,
                                1,
                            ))

                        }
                    }
                    this.draw();
                }
                this.update()
            }

            window.addEventListener("click", (e) => {
                var x = e.clientX;
                var y = canvas.height;
                var R = Math.floor(Math.random() * 255)
                var G = Math.floor(Math.random() * 255)
                var B = Math.floor(Math.random() * 255)
                var height = (Math.floor(Math.random() * 20)) + 10;
                fireworkArray.push(new Firework(x, y, height, 5, R, G, B))
            })

            function Particle(x, y, radius, R, G, B, A) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.R = R;
                this.G = G;
                this.B = B;
                this.A = A;
                this.timer = 0;
                this.fade = false;

                // Change random spread
                this.xVol = (Math.random() * 10) - 4
                this.yVol = (Math.random() * 10) - 4


                console.log(this.xVol, this.yVol)
                this.draw = function () {
                    //   ctx.globalCompositeOperation = "lighter"
                    ctx.fillStyle = "rgba(" + R + "," + G + "," + B + "," + this.A + ")";
                    ctx.save();
                    ctx.beginPath();
                    // ctx.fillStyle = "white"
                    ctx.globalCompositeOperation = "screen"
                    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false);
                    ctx.fill();

                    ctx.restore();
                }
                this.update = function () {
                    this.x += this.xVol;
                    this.y += this.yVol;

                    // Comment out to stop gravity. 
                    if (this.timer < 200) {
                        this.yVol += 0.12;
                    }
                    this.A -= 0.02;
                    if (this.A < 0) {
                        this.fade = true;
                    }
                    this.draw();
                }
                this.update();
            }

            var fireworkArray = [];
            var particleArray = [];
            for (var i = 0; i < 6; i++) {
                var x = Math.random() * canvas.width;
                var y = canvas.height;
                var R = Math.floor(Math.random() * 255)
                var G = Math.floor(Math.random() * 255)
                var B = Math.floor(Math.random() * 255)
                var height = (Math.floor(Math.random() * 20)) + 10;
                fireworkArray.push(new Firework(x, y, height, 5, R, G, B))
            }


            function animate() {
                requestAnimationFrame(animate);
                // ctx.clearRect(0,0,canvas.width,canvas.height)
                ctx.fillStyle = "rgba(0,0,0,0.1)"
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                for (var i = 0; i < fireworkArray.length; i++) {
                    fireworkArray[i].update();
                }
                for (var j = 0; j < particleArray.length; j++) {
                    particleArray[j].update();
                }
                if (fireworkArray.length < 4) {
                    var x = Math.random() * canvas.width;
                    var y = canvas.height;
                    var height = Math.floor(Math.random() * 20);
                    var yVol = 5;
                    var R = Math.floor(Math.random() * 255);
                    var G = Math.floor(Math.random() * 255);
                    var B = Math.floor(Math.random() * 255);
                    fireworkArray.push(new Firework(x, y, height, yVol, R, G, B));
                }


                fireworkArray = fireworkArray.filter(obj => !obj.boom);
                particleArray = particleArray.filter(obj => !obj.fade);
            }
            animate();

            window.addEventListener("resize", (e) => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            })
        }, 500)
    }, 2000)

})

// particlesJS("particles-js", { "particles": { "number": { "value": 160, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } }, "opacity": { "value": 1, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 4, "size_min": 0.3, "sync": false } }, "line_linked": { "enable": false, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 600 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "repulse" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 250, "size": 0, "duration": 2, "opacity": 0, "speed": 3 }, "repulse": { "distance": 400, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true }); var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function () { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;
