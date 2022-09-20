// Script to open and close sidebar
export function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

export function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

// Set NAV bar to have different active links
export function activeRead() {
    document.getElementById("readingHeaderLink").classList.add("w3-text-teal");
}

export function activeWrite() {
    document.getElementById("writingHeaderLink").classList.add("w3-text-teal");
}

export function activeProfile() {
    document.getElementById("profileHeaderLink").classList.add("w3-text-teal");
}