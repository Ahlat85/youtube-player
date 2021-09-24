const youtube_player = function(id) {
  const _element = document.getElementById(id);
  const _src = new URL(_element.getAttribute("src"));

  const data = {
    time: {
      get: () => {
        return _src.searchParams.get("start");
      },
      set: second => {
        const start = _src.searchParams.get("start");
        _src.searchParams.set("start", second);
        _element.setAttribute("src", _src);
      },
      add: second => {
        const start = _src.searchParams.get("start");
        second = parseInt(start) + parseInt(second);
        _src.searchParams.set("start", second);
        _element.setAttribute("src", _src);
      }
    }
  }

  return data;
}