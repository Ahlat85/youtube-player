const youtube_player = id => {
  let _element = document.getElementById(id);
  let _src = new URL(_element.getAttribute("src"));

  const data = {
    element: {
      get: () => {
        return _element;
      },
      set: id => {
        _element = document.getElementById(id);
      }
    },
    src: {
      //  BUG: Nilai yang dihasilkan adalah parameter start.
      get: () => {
        return _element.getCurrentTime;
      },
      refresh: () => {
        data.src.set(_src);
      },
      set: url => {
        _src = new URL(url);
        _element.setAttribute("src", _src);
      }
    },
    time: {
      get: () => {
        return _src.searchParams.get("start");
      },
      set: second => {
        const start = _src.searchParams.get("start");
        _src.searchParams.set("start", second);
        data.src.set(_src);
      },
      add: second => {
        const start = _src.searchParams.get("start");
        second = parseInt(start) + parseInt(second);
        _src.searchParams.set("start", second);
        data.time.set(second);
      }
    },
  }

  return data;
}

//  Set video controllers button
(function() {
  const buttons = Array.from(document.getElementsByClassName("btn-youtube-player"));
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("youtube-player-id");
      const value = btn.getAttribute("youtube-player-value");
      const action = btn.getAttribute("youtube-player-action")
      const video = youtube_player(id);

      switch (action) {
        case "forward":
          video.time.add(value);
          break;
        case "refresh":
          video.src.refresh();
          break;
      }
    });
  })
})()