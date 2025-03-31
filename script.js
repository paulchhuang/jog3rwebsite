get = id => document.getElementById(id);

function author_node(author) {
    var span = document.createElement("span");
    var a = document.createElement("a");
    var sup = document.createElement("sup");
    a.textContent = author.name;
    a.href = author.email;
    sup.textContent = author.footnote.map(String).join(",");
    sup.textContent = author.affiliations.map(String).join(",");
    span.appendChild(a);
    span.appendChild(sup);
    return span
}

function affiliations_node(affiliations) {
    var span = document.createElement("span");
    span.innerHTML = affiliations.map((affiliation, index) => 
        "<sup>" + (index + 1).toString() + "</sup>" + affiliation
    ).join(", ");
    return span
}

function footnote_node(footnotes) {
    var span = document.createElement("span");
    span.innerHTML = footnotes.map((footnote, index) => 
        "<sup>" + (index) + "</sup>" + footnote
    ).join(", ");
    return span
}

function copy_bibtex() {
    var range = document.createRange();
    range.selectNode(get("bibtex"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
}


function make_site(paper){
    document.title = paper.title;
    get("title").textContent = paper.title;
    // get("conference").textContent = paper.conference;
    paper.authors.map((author, index) => {
        node = author_node(author);
        get("author-list").appendChild(node);
        if(index == paper.authors.length - 1) return;
        node.innerHTML += ", "
    })
    get("affiliation-list").appendChild(affiliations_node(paper.affiliations));
    //get("abstract").textContent = paper.abstract;
    for(var button in paper.URLs) {
        node = get(button);
        url = paper.URLs[button];
        if(url == null) node.remove();
        else node.href = url;
    }
    //get("video").src = paper.URLs.youtube.replace('.be','be.com/embed/');
    get("copy-button").onclick = copy_bibtex;
}

function set_slider(root) {
    const slidesContainer = root.querySelector(".slides-container");
    const slide = root.querySelector(".slide");
    const prevButton = root.querySelector(".slide-arrow-prev");
    const nextButton = root.querySelector(".slide-arrow-next");
    nextButton.addEventListener("click", (event) => {
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft += slideWidth;
    });
    prevButton.addEventListener("click", () => {
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft -= slideWidth;
    });
}
sliders = document.getElementsByClassName("slider-wrapper")
for (var i = 0; i < sliders.length; i++) set_slider(sliders[i])

// Read JSON
make_site({
    "title": "JOG3R: Towards 3D-Consistent Video Generators",
    "authors": [
        {
            "name": "Chun-Hao Huang",
            "email": "https://paulchhuang.wixsite.com/chhuang",
            "affiliations": ["1"],
            "footnote": [""]
        },
        {
          "name": "Niloy J. Mitra",
          "email": "http://www0.cs.ucl.ac.uk/staff/n.mitra/",
          "affiliations": ["1", "2"],
          "footnote": [""]
        },
        {
            "name": "Hyeonho Jeong",
            "email": "https://hyeonho99.github.io/",
            "affiliations": ["3"],
            "footnote": [""]
        },
        {
          "name": "Jae Shin Yoon",
          "email": "https://gorokee.github.io/jsyoon",
          "affiliations": ["1"],
          "footnote": [""]
        },
        {
          "name": "Duygu Ceylan",
          "email": "https://duygu-ceylan.com/",
          "affiliations": ["1"],
          "footnote": [""]
        }
    ],
    "affiliations": ["Adobe Research", "University College London", "KAIST"],
    "URLs": {
        "arxiv": "https://arxiv.org/abs/2501.01409",
        // "code": "https://github.com/duyguceylan/pix2video"
    },
    "abstract": "Emergent capabilities of image generators have led to many impactful zero- or few-shot applications. Inspired by this success, we investigate whether video generators similarly exhibit 3D-awareness. Using structure-from-motion as a 3D-aware task, we test if intermediate features of a video generator (OpenSora in our case) can support camera pose estimation. Surprisingly, we only find a weak correlation between the two tasks. Deeper investigation reveals that although the video generator produces plausible video frames, the frames themselves are not truly 3D-consistent. Instead, we propose to jointly train for the two tasks, using photometric generation and 3D aware errors. Specifically, we find that SoTA video generation and camera pose estimation networks share common structures, and propose an architecture that unifies the two. The proposed unified model, named \nameMethod, produces camera pose estimates with competitive quality while producing 3D-consistent videos. In summary, we propose the first unified video generator that is  3D-consistent, generates realistic video frames, and can potentially be repurposed for other 3D-aware tasks."
})
//fetch("./paper.json").then(response => response.json).then(json => make_site(json));
