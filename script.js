// ================= CÉSAR =================
function cifrarCesar() {
    let texto = document.getElementById("cesarTexto").value;
    let clave = parseInt(document.getElementById("cesarClave").value);
    let resultado = "";

    for (let c of texto) {
        if (c.match(/[a-z]/i)) {
            let code = c.charCodeAt(0);
            let base = code >= 97 ? 97 : 65;
            resultado += String.fromCharCode((code - base + clave + 26) % 26 + base);
        } else {
            resultado += c;
        }
    }
    document.getElementById("cesarResultado").innerText = resultado;
}

function descifrarCesar() {
    let clave = parseInt(document.getElementById("cesarClave").value);
    document.getElementById("cesarClave").value = -clave;
    cifrarCesar();
    document.getElementById("cesarClave").value = clave;
}

// ================= VIGENERE =================
function cifrarVigenere() {
    let texto = document.getElementById("vigTexto").value.toUpperCase();
    let clave = document.getElementById("vigClave").value.toUpperCase();
    let res = "";
    let j = 0;

    for (let i = 0; i < texto.length; i++) {
        let c = texto[i];
        if (c.match(/[A-Z]/)) {
            let t = c.charCodeAt(0) - 65;
            let k = clave.charCodeAt(j % clave.length) - 65;
            res += String.fromCharCode((t + k) % 26 + 65);
            j++;
        } else res += c;
    }
    document.getElementById("vigResultado").innerText = res;
}

function descifrarVigenere() {
    let texto = document.getElementById("vigTexto").value.toUpperCase();
    let clave = document.getElementById("vigClave").value.toUpperCase();
    let res = "";
    let j = 0;

    for (let i = 0; i < texto.length; i++) {
        let c = texto[i];
        if (c.match(/[A-Z]/)) {
            let t = c.charCodeAt(0) - 65;
            let k = clave.charCodeAt(j % clave.length) - 65;
            res += String.fromCharCode((t - k + 26) % 26 + 65);
            j++;
        } else res += c;
    }
    document.getElementById("vigResultado").innerText = res;
}

// ================= TRANSPOSICIÓN COLUMNAR =================
function cifrarColumnar() {
    let texto = document.getElementById("colTexto").value.replace(/\s/g, "");
    let clave = document.getElementById("colClave").value;
    let cols = clave.length;
    let filas = Math.ceil(texto.length / cols);
    let matriz = [];

    let k = 0;
    for (let i = 0; i < filas; i++) {
        matriz[i] = [];
        for (let j = 0; j < cols; j++) {
            matriz[i][j] = texto[k++] || "X";
        }
    }

    let orden = [...clave].map((c, i) => [c, i]).sort();
    let res = "";

    for (let [, idx] of orden) {
        for (let i = 0; i < filas; i++) {
            res += matriz[i][idx];
        }
    }
    document.getElementById("colResultado").innerText = res;
}

function descifrarColumnar() {
    let texto = document.getElementById("colTexto").value.replace(/\s/g, "");
    let clave = document.getElementById("colClave").value;
    let cols = clave.length;
    let filas = Math.ceil(texto.length / cols);

    let orden = [...clave].map((c, i) => [c, i]).sort();
    let matriz = Array.from({ length: filas }, () => Array(cols).fill(""));
    let k = 0;

    for (let [, idx] of orden) {
        for (let i = 0; i < filas; i++) {
            matriz[i][idx] = texto[k++] || "";
        }
    }

    let res = "";
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < cols; j++) {
            res += matriz[i][j];
        }
    }
    document.getElementById("colResultado").innerText = res;
}

// ================= AFÍN =================
function cifrarAfin() {
    let texto = document.getElementById("afinTexto").value.toUpperCase();
    let a = parseInt(document.getElementById("afinA").value);
    let b = parseInt(document.getElementById("afinB").value);
    let res = "";

    for (let c of texto) {
        if (c.match(/[A-Z]/)) {
            let x = c.charCodeAt(0) - 65;
            res += String.fromCharCode((a * x + b) % 26 + 65);
        } else res += c;
    }
    document.getElementById("afinResultado").innerText = res;
}

function descifrarAfin() {
    let texto = document.getElementById("afinTexto").value.toUpperCase();
    let a = parseInt(document.getElementById("afinA").value);
    let b = parseInt(document.getElementById("afinB").value);
    let res = "";

    // inverso modular de a
    let aInv = 0;
    for (let i = 0; i < 26; i++) {
        if ((a * i) % 26 === 1) {
            aInv = i;
            break;
        }
    }

    for (let c of texto) {
        if (c.match(/[A-Z]/)) {
            let y = c.charCodeAt(0) - 65;
            res += String.fromCharCode((aInv * (y - b + 26)) % 26 + 65);
        } else res += c;
    }
    document.getElementById("afinResultado").innerText = res;
}
