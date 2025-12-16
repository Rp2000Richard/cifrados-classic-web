// ---------- CÉSAR ----------
function cifrarCesar() {
    let texto = document.getElementById("cesarTexto").value;
    let clave = parseInt(document.getElementById("cesarClave").value);
    let resultado = "";

    for (let c of texto) {
        if (c.match(/[a-z]/i)) {
            let codigo = c.charCodeAt(0);
            let base = codigo >= 97 ? 97 : 65;
            resultado += String.fromCharCode((codigo - base + clave) % 26 + base);
        } else {
            resultado += c;
        }
    }
    document.getElementById("cesarResultado").innerText = resultado;
}

function descifrarCesar() {
    document.getElementById("cesarClave").value *= -1;
    cifrarCesar();
}

// ---------- VIGENERE ----------
function cifrarVigenere() {
    let texto = document.getElementById("vigTexto").value;
    let clave = document.getElementById("vigClave").value.toUpperCase();
    let res = "";
    let j = 0;

    for (let i = 0; i < texto.length; i++) {
        let c = texto[i];
        if (c.match(/[A-Z]/i)) {
            let t = texto.charCodeAt(i) - 65;
            let k = clave.charCodeAt(j % clave.length) - 65;
            res += String.fromCharCode((t + k) % 26 + 65);
            j++;
        } else res += c;
    }
    document.getElementById("vigResultado").innerText = res;
}

function descifrarVigenere() {
    let texto = document.getElementById("vigTexto").value;
    let clave = document.getElementById("vigClave").value.toUpperCase();
    let res = "";
    let j = 0;

    for (let i = 0; i < texto.length; i++) {
        let c = texto[i];
        if (c.match(/[A-Z]/i)) {
            let t = texto.charCodeAt(i) - 65;
            let k = clave.charCodeAt(j % clave.length) - 65;
            res += String.fromCharCode((t - k + 26) % 26 + 65);
            j++;
        } else res += c;
    }
    document.getElementById("vigResultado").innerText = res;
}

// ---------- TRANSPOSICIÓN ----------
function cifrarColumnar() {
    let texto = document.getElementById("colTexto").value.replace(/\s/g, "");
    let clave = document.getElementById("colClave").value;
    let columnas = clave.length;
    let filas = Math.ceil(texto.length / columnas);
    let matriz = [];

    let k = 0;
    for (let i = 0; i < filas; i++) {
        matriz[i] = [];
        for (let j = 0; j < columnas; j++) {
            matriz[i][j] = texto[k++] || "X";
        }
    }

    let orden = [...clave].map((c, i) => [c, i]).sort();
    let res = "";

    for (let o of orden) {
        for (let i = 0; i < filas; i++) {
            res += matriz[i][o[1]];
        }
    }
    document.getElementById("colResultado").innerText = res;
}

function descifrarColumnar() {
    document.getElementById("colResultado").innerText = "Descifrado inverso explicado en el video";
}

// ---------- AFÍN ----------
function cifrarAfin() {
    let texto = document.getElementById("afinTexto").value;
    let a = parseInt(document.getElementById("afinA").value);
    let b = parseInt(document.getElementById("afinB").value);
    let res = "";

    for (let c of texto) {
        if (c.match(/[A-Z]/i)) {
            let x = c.toUpperCase().charCodeAt(0) - 65;
            res += String.fromCharCode((a * x + b) % 26 + 65);
        } else res += c;
    }
    document.getElementById("afinResultado").innerText = res;
}

function descifrarAfin() {
    document.getElementById("afinResultado").innerText = "Descifrado Afín explicado en el video";
}
