// 1. Shadow Host Oluştur ve Sayfaya Ekle
const host = document.createElement('div');
host.id = 'scanscript-shadow-host';
document.body.appendChild(host);

const shadow = host.attachShadow({ mode: 'closed' });

// 2. Siyah & #ecec00 Sarı Tema Tasarımı
const style = document.createElement('style');
style.textContent = `
    #sidebar {
        position: fixed;
        top: 0;
        right: -420px;
        width: 400px;
        height: 100vh;
        background-color: #000000;
        border-left: 2px solid #ecec00;
        z-index: 999999999;
        box-shadow: -5px 0 25px rgba(0,0,0,0.7);
        transition: right 0.3s ease, opacity 0.2s ease;
        display: flex;
        flex-direction: column;
        padding: 20px;
        box-sizing: border-box;
        color: #ecec00;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    #sidebar.open { right: 0; }
    
    #resize-handle {
        position: absolute;
        top: 0;
        left: 0;
        width: 6px;
        height: 100%;
        cursor: ew-resize;
        background-color: transparent;
    }
    #resize-handle:hover { background-color: #ecec00; }
    
    #toggle-btn {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 999999999;
        background-color: #ecec00;
        color: #000000;
        border: none;
        padding: 10px 15px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    }
    #toggle-btn.hidden { display: none !important; }
    
    h3 { margin-bottom: 5px; color: #ecec00; font-size: 18px; margin-top: 0; }
    .subtitle { font-size: 11px; color: #888800; margin-bottom: 12px; }
    
    .settings-panel {
        background: #111111;
        padding: 10px;
        border-radius: 6px;
        border: 1px solid #333300;
        margin-bottom: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .settings-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 11px;
        color: #ecec00;
    }
    .settings-row input { width: 100px; accent-color: #ecec00; }
    
    /* Gelişmiş Editör Alanı */
    .editor-container {
        flex: 1;
        display: flex;
        position: relative;
        background-color: #111111;
        border: 1px solid #333300;
        border-radius: 6px;
        overflow: hidden;
    }
    
    .line-numbers {
        width: 40px;
        padding: 12px 0;
        text-align: right;
        padding-right: 8px;
        background-color: #080808;
        border-right: 1px solid #222200;
        color: #555500;
        font-family: 'Courier New', Courier, monospace;
        font-size: 15px;
        line-height: 1.5;
        user-select: none;
        overflow: hidden;
        box-sizing: border-box;
    }
    
    textarea {
        flex: 1;
        background-color: transparent;
        border: none;
        color: #ecec00;
        padding: 12px;
        resize: none;
        font-size: 15px;
        line-height: 1.5;
        font-family: 'Courier New', Courier, monospace;
        overflow-y: auto;
        box-sizing: border-box;
    }
    textarea:focus { outline: none; }
    
    .stats { font-size: 11px; color: #888800; margin: 8px 0; display: flex; justify-content: space-between; }
    
    .btn-group { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 5px; }
    button.action-btn {
        flex: 1;
        min-width: 80px;
        color: #000000;
        background-color: #ecec00;
        border: none;
        padding: 10px;
        border-radius: 6px;
        font-weight: bold;
        cursor: pointer;
        font-size: 11px;
        transition: opacity 0.2s;
    }
    button.action-btn:hover { opacity: 0.85; }
    
    #txt-btn { background-color: #000000; color: #ecec00; border: 1px solid #ecec00; }
`;

// 3. HTML Yapısı
const sidebar = document.createElement('div');
sidebar.id = 'sidebar';
sidebar.innerHTML = `
    <div id="resize-handle"></div>
    <h3>ScanScript Studio v1.0</h3>
    <div class="subtitle">Çevirmen İstasyonu (Kısayol: Ctrl+Shift+P ile Paneli Tamamen Gizle)</div>
    
    <div class="settings-panel">
        <div class="settings-row">
            <label>Panel Şeffaflığı:</label>
            <input type="range" id="opacity-slider" min="20" max="100" value="100">
        </div>
        <div class="settings-row">
            <label>Yazı Boyutu:</label>
            <input type="range" id="font-slider" min="12" max="24" value="15">
        </div>
        <div class="settings-row">
            <label>Satır Aralığı:</label>
            <input type="range" id="line-slider" min="12" max="25" value="15" step="1">
        </div>
    </div>

    <div class="editor-container">
        <div id="line-numbers" class="line-numbers">1</div>
        <textarea id="textarea" placeholder="Kısayollar:&#10;• Ctrl + Enter -> Otomatik Sayfa Çizgisi atar.&#10;• Satır başında Harf + Tab -> Otomatik İki Nokta (A: ) koyar."></textarea>
    </div>
    
    <div class="stats">
        <span id="page-count">Tahmini Balon: 0</span>
        <span id="char-count">Karakter: 0 | Kelime: 0</span>
    </div>
    
    <div class="btn-group">
        <button id="caps-btn" class="action-btn">BÜYÜK HARF</button>
        <button id="txt-btn" class="action-btn">.TXT</button>
        <button id="docx-btn" class="action-btn">.DOCX</button>
    </div>
`;

const toggleBtn = document.createElement('button');
toggleBtn.id = 'toggle-btn';
toggleBtn.innerText = '📝 Çeviri Paneli';
// Sayfa yüklendiğinde buton gizli başlar; sadece toolbar ikonu tetikler
toggleBtn.classList.add('hidden');

shadow.appendChild(style);
shadow.appendChild(sidebar);
shadow.appendChild(toggleBtn);

// Element Referansları
const txtArea = shadow.getElementById('textarea');
const lineNumbersDiv = shadow.getElementById('line-numbers');
const charCount = shadow.getElementById('char-count');
const pageCount = shadow.getElementById('page-count');
const fontSlider = shadow.getElementById('font-slider');
const lineSlider = shadow.getElementById('line-slider');
const opacitySlider = shadow.getElementById('opacity-slider');
const resizeHandle = shadow.getElementById('resize-handle');
const siteKey = 'scanscript_' + window.location.hostname;

// --- DİNAMİK FONKSİYONLAR ---

// 1. Satır Numarası Motoru
function updateLineNumbers() {
    const lines = txtArea.value.split('\n');
    const lineCount = Math.max(1, lines.length);
    let numberHtml = '';
    for (let i = 1; i <= lineCount; i++) {
        numberHtml += i + '<br>';
    }
    lineNumbersDiv.innerHTML = numberHtml;
}

// Textarea kaydırıldığında numaraları da milimetrik olarak kaydırır
txtArea.addEventListener('scroll', () => {
    lineNumbersDiv.scrollTop = txtArea.scrollTop;
});

// 2. Genişlik Ayarlayıcı
let isResizing = false;
resizeHandle.addEventListener('mousedown', (e) => { isResizing = true; document.body.style.userSelect = 'none'; });
document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    const calculatedWidth = window.innerWidth - e.clientX;
    if (calculatedWidth > 280 && calculatedWidth < 800) sidebar.style.width = `${calculatedWidth}px`;
});
document.addEventListener('mouseup', () => { isResizing = false; document.body.style.userSelect = 'auto'; });

// 3. UX Kontrolleri
opacitySlider.addEventListener('input', (e) => sidebar.style.opacity = e.target.value / 100);
fontSlider.addEventListener('input', (e) => {
    txtArea.style.fontSize = `${e.target.value}px`;
    lineNumbersDiv.style.fontSize = `${e.target.value}px`;
});
lineSlider.addEventListener('input', (e) => {
    txtArea.style.lineHeight = (e.target.value / 10);
    lineNumbersDiv.style.lineHeight = (e.target.value / 10);
});

// 4. Akıllı Kısayollar (Tab Autocomplete & Ctrl+Enter Seperator)
txtArea.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        const cursorPosition = txtArea.selectionStart;
        const textBeforeCursor = txtArea.value.substring(0, cursorPosition);
        const lastNewLine = textBeforeCursor.lastIndexOf('\n');
        const currentLine = textBeforeCursor.substring(lastNewLine + 1);
        
        if (currentLine.trim().length > 0 && !currentLine.includes(':')) {
            const extendedLine = currentLine.trim() + ": ";
            txtArea.value = txtArea.value.substring(0, lastNewLine + 1) + extendedLine + txtArea.value.substring(cursorPosition);
            const newCursorPos = lastNewLine + 1 + extendedLine.length;
            txtArea.setSelectionRange(newCursorPos, newCursorPos);
            updateStats();
            updateLineNumbers();
        }
    }
    
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        const cursorPosition = txtArea.selectionStart;
        const pageMatches = txtArea.value.match(/=== SAYFA \d+ ===/g);
        const nextNextPageNum = pageMatches ? pageMatches.length + 1 : 1;
        
        const seperator = `\n\n=== SAYFA ${nextNextPageNum} ===\n`;
        txtArea.value = txtArea.value.substring(0, cursorPosition) + seperator + txtArea.value.substring(cursorPosition);
        const newCursorPos = cursorPosition + seperator.length;
        txtArea.setSelectionRange(newCursorPos, newCursorPos);
        updateStats();
        updateLineNumbers();
    }
});

// Küresel Gizleme Kısayolu: Ctrl + Shift + P
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyP') {
        e.preventDefault();
        toggleBtn.classList.toggle('hidden');
        if (sidebar.classList.contains('open')) sidebar.classList.remove('open');
    }
});

// Toolbar ikonundan gelen mesajı dinle
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'toggleVisibility') {
        const isHidden = toggleBtn.classList.contains('hidden');
        if (isHidden) {
            // Görünür yap ve paneli aç
            toggleBtn.classList.remove('hidden');
            sidebar.classList.add('open');
            setTimeout(() => { lineNumbersDiv.scrollTop = txtArea.scrollTop; }, 50);
        } else {
            // Paneli ve butonu gizle
            toggleBtn.classList.add('hidden');
            sidebar.classList.remove('open');
        }
    }
});

// Panel Aç / Kapat
toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    setTimeout(() => { lineNumbersDiv.scrollTop = txtArea.scrollTop; }, 50);
});

// 5. Hafıza ve Otomatik Kayıt Sistemi (Auto-Save Debounce)
chrome.storage.local.get([siteKey], (result) => {
    if (result[siteKey]) { 
        txtArea.value = result[siteKey]; 
        updateStats(); 
        updateLineNumbers();
    }
});

let saveTimeout;
txtArea.addEventListener('input', () => {
    updateStats();
    updateLineNumbers();
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        chrome.storage.local.set({ [siteKey]: txtArea.value });
    }, 500);
});

function updateStats() {
    const text = txtArea.value;
    const chars = text.length;
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const dialogLines = text.split('\n').filter(line => line.includes(':') && line.split(':')[1].trim().length > 0).length;
    
    charCount.innerText = `Karakter: ${chars} | Kelime: ${words}`;
    pageCount.innerText = `Tahmini Balon: ${dialogLines}`;
}

// 6. Büyük Harfe Çevirme
shadow.getElementById('caps-btn').addEventListener('click', () => {
    txtArea.value = txtArea.value.toLocaleUpperCase('tr-TR');
    chrome.storage.local.set({ [siteKey]: txtArea.value });
});

// 7. Gelişmiş Dosya Çıktı Motorları

// TXT İndirme
shadow.getElementById('txt-btn').addEventListener('click', () => {
    downloadFile(txtArea.value, 'text/plain;charset=utf-8', 'txt');
});

// Hata Vermeyen, Kusursuz Açılan Gerçek Word (.DOCX) Çıktısı
shadow.getElementById('docx-btn').addEventListener('click', () => {
    const text = txtArea.value;
    if (!text.trim()) return alert("Çeviri boş.");

    // RTF standartlarına göre Türkçe karakterleri Unicode kodlarına (\uXXXX) çeviren mini motor
    function encodeRTF(str) {
        return str.replace(/[^\x00-\x7F]/g, function(ch) {
            let code = ch.charCodeAt(0);
            if (code < 0) code += 65536;
            return '\\u' + code + '?';
        });
    }

    const lines = text.split('\n');
    let rtfBody = '';

    lines.forEach(line => {
        const cleanLine = encodeRTF(line);
        if (line.startsWith('===') || line.startsWith('SAYFA')) {
            // Sayfa başlıkları için: Kalın, 14pt (28 yarım punto), hafif aralıklı paragraflar
            rtfBody += `\\par\\sa120\\sb240\\b\\fs28 ${cleanLine}\\b0\\par`;
        } else {
            // Normal konuşmalar için: 11pt (22 yarım punto) standart paragraf
            rtfBody += `\\par\\sa80\\fs22 ${cleanLine}\\par`;
        }
    });

    // Word'ün uyarı vermeden doğrudan açtığı zengin metin döküman yapısı
    const rtfContent = `{\\rtf1\\ansi\\ansicpg1254\\deff0{\\fonttbl{\\f0\\fnil\\fcharset162 Arial;}}\\viewkind4\\uc1 ${rtfBody}}`;

    downloadFile(rtfContent, 'application/rtf', 'docx');
});

// İndirme Tetikleyici
function downloadFile(content, type, extension) {
    if (!txtArea.value.trim()) return alert("Lütfen önce çeviri yazın.");
    const blob = new Blob([content], { type: type });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const cleanHost = window.location.hostname.replace('www.', '');
    link.download = `${cleanHost}_ceviri.${extension}`;
    link.click();
    URL.revokeObjectURL(link.href);
}