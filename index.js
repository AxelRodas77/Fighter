// Creamos una constante que seleccione en nuestro documento html la etiqueta canvas.
const canvas = document.querySelector('canvas');
//Asignamos un contexto de dibujo asociado al canvas, creando un objeto que representa un contexto de renderizado en dos dimensiones.
const c = canvas.getContext('2d');

//Configuramos el ancho y alto de nuestra ventana de dibujo o canvas.
canvas.width = 1111;
canvas.height = 625;

//Este metodo del contecto 2D dibuja un rectactangulo, los primeros dos parametros indican la posicion (x, y) y luego los otros dos el ancho y alto del rectangulo que lo igualamos a nuestro canvas.
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7

const background = new Sprite({
    position: {
        x: 0,
        y:0
    },
    imageSrc: './public/img/backgroundAgrandado.png'
})

const shop = new Sprite({
    position: {
        x: 600,
        y:123
    },
    imageSrc: './public/img/shop.png',
    scale: 3.1,
    framesMax: 6
})

//Creamos nuestro jugador que sera un nuevo objeto de nuestra clase Fighter
const player = new Fighter({
    //Se le indica que el argumento sera un objeto por medio de las llaves
    position: {
        //Configuramos la posicion inicial de nuestro jugador como un objeto de dos dimenciones (x, y)
        x:100,
        y:0
    },
    velocity: {
        //Configuramos la velocidad inicial de nuestro jugador como un objeto de dos dimenciones (x, y)
        x:0,
        y:0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './public/img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 155
    },
    sprites: {
        idle: {
            imageSrc: './public/img/samuraiMack/Idle.png',
            framesMax: 8,
        },
        run: {
            imageSrc: './public/img/samuraiMack/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './public/img/samuraiMack/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './public/img/samuraiMack/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './public/img/samuraiMack/Attack1.png',
            framesMax: 6,
        },
        takeHit: {
            imageSrc: './public/img/samuraiMack/Take Hit - white silhouette.png',
            framesMax: 4
        },
        death: {
            imageSrc: './public/img/samuraiMack/Death.png',
            framesMax: 6
        }
    },
    attackBox: {
        width: 157,
        height: 50,
        offset: {
            x:100,
            y:50
        }
    },
})

//Creamos nuestro jugador que sera un nuevo objeto de nuestra clase Fighter
const enemy = new Fighter({
    //Se le indica que el argumento sera un objeto por medio de las llaves
    position: {
        //Configuramos la posicion inicial de nuestro enemigo como un objeto de dos dimenciones (x, y)
        x:970,
        y:0
    },
    velocity: {
        //Configuramos la velocidad inicial de nuestro enemigo como un objeto de dos dimenciones (x, y)
        x:0,
        y:0
    },
    //Define el color del rectangulo del enemigo.
    color: 'blue',
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: './public/img/kenji/Idle.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 170
    },
    sprites: {
        idle: {
            imageSrc: './public/img/kenji/Idle.png',
            framesMax: 4,
        },
        run: {
            imageSrc: './public/img/kenji/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './public/img/kenji/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './public/img/kenji/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './public/img/kenji/Attack1.png',
            framesMax: 4,
        },
        takeHit: {
            imageSrc: './public/img/kenji/Take hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './public/img/kenji/Death.png',
            framesMax: 7
        }
    },
        attackBox: {
        width: 145,
        height: 50,
        offset: {
            x:-173,
            y:50
        }
    },
})

console.log(player)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
}

decreaseTimer()

//Se crea la funcion de animacion.
function animate() {
    //Este metodo le indica al navegador que se desea realizar una animacion. Solicita al navegador que llame a una funcion de devolucion de llamada proporcionada por el usuario antes del siguiente cuadro
    window.requestAnimationFrame(animate)       //Crea un loop para la animacion.
    c.fillStyle = 'black'                       //Vuelve el fondo oscuro.
    c.fillRect(0, 0, canvas.width, canvas.height)    //Vuelve a dibujar rectangulos en 2D.
    background.update()
    shop.update()
    player.update()                 //Actualiza las propiedades de nuestro jugador
    enemy.update()                  //Actaliza las propiedades de nuestro enemigo       

    player.velocity.x = 0
    enemy.velocity.x = 0

    //player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.switchSprite('run')
    } else {
        player.switchSprite('idle')
    }

    //jumping
    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }

    //enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    } else {
        enemy.switchSprite('idle')
    }

     //jumping
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }

    //detect for collision & enemy gets hit
    if (rectangularCollision({ 
        rectangle1: player, 
        rectangle2: enemy 
        }) && 
        player.isAttacking && 
        player.framesCurrent === 4
    ) {
        enemy.takeHit()
        player.isAttacking = false

        document.querySelector('.enemyHealth').style.width = enemy.health + '%'
    }

    //if player missed
    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false
    }

    //this is where our player gets hit
    if (rectangularCollision({ 
        rectangle1: enemy, 
        rectangle2: player 
        }) && 
        enemy.isAttacking && 
        enemy.framesCurrent === 2
    ) {
        player.takeHit()
        enemy.isAttacking = false
        
        document.querySelector('.playerHealth').style.width = player.health + '%'
    }

    //if enemy missed
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false
    }

    //end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy, timerId })
    }
}

//Se llama a la funcion animacion.
animate()

window.addEventListener('keydown', (event) => {
    if (!player.dead) {
        //keys player
        switch (event.key) {
            case 'd':
                keys.d.pressed = true
                player.lastKey = 'd'
            break
            case 'a':
                keys.a.pressed = true
                player.lastKey = 'a'
            break
            case 'w':
                player.velocity.y = -17
            break
            case ' ':
                player.attack()
            break        
        }
    }
    if (!enemy.dead) {
        //keys enemy
        switch (event.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                enemy.lastKey = 'ArrowRight'
            break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
            break
            case 'ArrowUp':
                enemy.velocity.y = -17
            break
            case 'ArrowDown':
                enemy.attack()
            break
        }
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
        break
        case 'a':
            keys.a.pressed = false
        break
    }

    //enemy keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
        break
    }
})