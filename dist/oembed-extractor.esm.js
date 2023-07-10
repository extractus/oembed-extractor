// @extractus/oembed-extractor@3.2.1, by @extractus - built with esbuild at 2023-07-10T13:44:45.529Z - published under MIT license

// src/utils/linker.js
var isValid = (url = "") => {
  try {
    const ourl = new URL(url);
    return ourl !== null && ourl.protocol.startsWith("http");
  } catch (err) {
    return false;
  }
};
var getDomain = (url) => {
  const host = new URL(url).host;
  return host.replace("www.", "");
};

// src/deno/cross-fetch.js
var cross_fetch_default = fetch;

// src/utils/retrieve.js
var profetch = async (url, options = {}) => {
  const { proxy = {}, signal = null } = options;
  const {
    target,
    headers = {}
  } = proxy;
  const res = await cross_fetch_default(target + encodeURIComponent(url), {
    headers,
    signal
  });
  return res;
};
var retrieve_default = async (url, options = {}) => {
  const {
    headers = {
      "user-agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0"
    },
    proxy = null,
    agent = null,
    signal = null
  } = options;
  const res = proxy ? await profetch(url, { proxy, signal }) : await cross_fetch_default(url, { headers, agent, signal });
  const status = res.status;
  if (status >= 400) {
    throw new Error(`Request failed with error code ${status}`);
  }
  try {
    const text = await res.text();
    return JSON.parse(text.trim());
  } catch (err) {
    throw new Error("Failed to convert data to JSON object");
  }
};

// src/utils/fetchEmbed.js
var isFacebookGraphDependent = (url) => {
  return getDomain(url) === "graph.facebook.com";
};
var getFacebookGraphToken = () => {
  const env = process.env || {};
  const appId = env.FACEBOOK_APP_ID;
  const clientToken = env.FACEBOOK_CLIENT_TOKEN;
  return `${appId}|${clientToken}`;
};
var fetchEmbed_default = async (url, params = {}, endpoint = "", options = {}) => {
  const query = {
    url,
    format: "json",
    ...params
  };
  if (query.maxwidth <= 0) {
    delete query.maxwidth;
  }
  if (query.maxheight <= 0) {
    delete query.maxheight;
  }
  if (isFacebookGraphDependent(endpoint)) {
    query.access_token = getFacebookGraphToken();
  }
  const queryParams = new URLSearchParams(query).toString();
  const link = endpoint + "?" + queryParams;
  const body = retrieve_default(link, options);
  return body;
};

// src/utils/providers.latest.js
var providers = [
  {
    "s": [
      "www\\.23hq\\.com/*/photo/*"
    ],
    "e": "www.23hq.com/23/oembed"
  },
  {
    "s": [
      "store\\.abraia\\.me/*"
    ],
    "e": "api.abraia.me/oembed"
  },
  {
    "s": [
      "play\\.acast\\.com/s/*"
    ],
    "e": "oembed.acast.com/v1/embed-player"
  },
  {
    "s": [
      "secure\\.actblue\\.com/donate/*"
    ],
    "e": "secure.actblue.com/cf/oembed"
  },
  {
    "s": [
      "adilo\\.bigcommand\\.com/watch/*"
    ],
    "e": "adilo.bigcommand.com/web/oembed"
  },
  {
    "s": [
      "v\\.afree\\.ca/ST/",
      "vod\\.afreecatv\\.com/ST/",
      "vod\\.afreecatv\\.com/PLAYER/STATION/",
      "play\\.afreecatv\\.com/"
    ],
    "e": "openapi.afreecatv.com/oembed/embedinfo"
  },
  {
    "s": [
      "altium\\.com/viewer/*"
    ],
    "e": "viewer.altium.com/shell/oembed"
  },
  {
    "s": [
      "app\\.altrulabs\\.com/*/*?answer_id=*",
      "app\\.altrulabs\\.com/player/*"
    ],
    "e": "api.altrulabs.com/api/v1/social/oembed"
  },
  {
    "s": [
      "live\\.amcharts\\.com/*"
    ],
    "e": "live.amcharts.com/oembed"
  },
  {
    "s": [
      "amtraker\\.com/trains/*",
      "beta\\.amtraker\\.com/trains/*"
    ],
    "e": "api.amtraker.com/v2/oembed"
  },
  {
    "s": [
      "www\\.animatron\\.com/project/*",
      "animatron\\.com/project/*"
    ],
    "e": "animatron.com/oembed/json"
  },
  {
    "s": [
      "animoto\\.com/play/*"
    ],
    "e": "animoto.com/oembeds/create"
  },
  {
    "s": [
      "anniemusic\\.app/t/*",
      "anniemusic\\.app/p/*"
    ],
    "e": "api.anniemusic.app/api/v1/oembed"
  },
  {
    "s": [
      "storymaps\\.arcgis\\.com/stories/*"
    ],
    "e": "storymaps.arcgis.com/oembed"
  },
  {
    "s": [
      "app\\.archivos\\.digital/app/view/*"
    ],
    "e": "app.archivos.digital/oembed/"
  },
  {
    "s": [
      "audioboom\\.com/channels/*",
      "audioboom\\.com/channel/*",
      "audioboom\\.com/playlists/*",
      "audioboom\\.com/podcasts/*",
      "audioboom\\.com/podcast/*",
      "audioboom\\.com/posts/*",
      "audioboom\\.com/episodes/*"
    ],
    "e": "audioboom.com/publishing/oembed.json"
  },
  {
    "s": [
      "audioclip\\.naver\\.com/channels/*/clips/*",
      "audioclip\\.naver\\.com/audiobooks/*"
    ],
    "e": "audioclip.naver.com/oembed"
  },
  {
    "s": [
      "audiomack\\.com/*/song/*",
      "audiomack\\.com/*/album/*",
      "audiomack\\.com/*/playlist/*"
    ],
    "e": "audiomack.com/oembed"
  },
  {
    "s": [
      "podcasts\\.audiomeans\\.fr/*"
    ],
    "e": "podcasts.audiomeans.fr/services/oembed"
  },
  {
    "s": [
      "app\\.avocode\\.com/view/*"
    ],
    "e": "stage-embed.avocode.com/api/oembed"
  },
  {
    "s": [
      "backtracks\\.fm/*/*/e/*",
      "backtracks\\.fm/*/s/*/*",
      "backtracks\\.fm/*/*/*/*/e/*/*",
      "backtracks\\.fm/*"
    ],
    "e": "backtracks.fm/oembed"
  },
  {
    "s": [
      "beams\\.fm/*"
    ],
    "e": "api.beams.fm/oEmbed"
  },
  {
    "s": [],
    "e": "www.beautiful.ai/api/oembed"
  },
  {
    "s": [
      "blackfire\\.io/profiles/*/graph",
      "blackfire\\.io/profiles/compare/*/graph"
    ],
    "e": "blackfire.io/oembed"
  },
  {
    "s": [
      "blogcast\\.host/embed/*",
      "blogcast\\.host/embedly/*"
    ],
    "e": "blogcast.host/oembed"
  },
  {
    "s": [
      "www\\.bookingmood\\.com/embed/*/*"
    ],
    "e": "bookingmood.com/api/oembed"
  },
  {
    "s": [],
    "e": "boxofficebuz.com/oembed"
  },
  {
    "s": [
      "view\\.briovr\\.com/api/v1/worlds/oembed/*"
    ],
    "e": "view.briovr.com/api/v1/worlds/oembed/"
  },
  {
    "s": [
      "www\\.bumper\\.com/oembed/bumper",
      "www\\.bumper\\.com/oembed-s/bumper"
    ],
    "e": "www.bumper.com/oembed/bumper"
  },
  {
    "s": [
      "buttondown\\.email/*"
    ],
    "e": "buttondown.email/embed"
  },
  {
    "s": [
      "cmc\\.byzart\\.eu/files/*"
    ],
    "e": "cmc.byzart.eu/oembed/"
  },
  {
    "s": [
      "cacoo\\.com/diagrams/*"
    ],
    "e": "cacoo.com/oembed.json"
  },
  {
    "s": [
      "minesweeper\\.today/*"
    ],
    "e": "minesweeper.today/api/oembed"
  },
  {
    "s": [
      "img\\.catbo\\.at/*"
    ],
    "e": "img.catbo.at/oembed.json"
  },
  {
    "s": [
      "view\\.ceros\\.com/*"
    ],
    "e": "view.ceros.com/oembed"
  },
  {
    "s": [
      "chainflix\\.net/video/*",
      "chainflix\\.net/video/embed/*",
      "*\\.chainflix\\.net/video/*",
      "*\\.chainflix\\.net/video/embed/*"
    ],
    "e": "www.chainflix.net/video/oembed"
  },
  {
    "s": [
      "public\\.chartblocks\\.com/c/*"
    ],
    "e": "embed.chartblocks.com/1.0/oembed"
  },
  {
    "s": [
      "chirb\\.it/*"
    ],
    "e": "chirb.it/oembed.json"
  },
  {
    "s": [
      "chroco\\.ooo/mypage/*",
      "chroco\\.ooo/story/*"
    ],
    "e": "chroco.ooo/embed"
  },
  {
    "s": [
      "www\\.circuitlab\\.com/circuit/*"
    ],
    "e": "www.circuitlab.com/circuit/oembed/"
  },
  {
    "s": [
      "www\\.clipland\\.com/v/*"
    ],
    "e": "www.clipland.com/api/oembed"
  },
  {
    "s": [
      "clyp\\.it/*",
      "clyp\\.it/playlist/*"
    ],
    "e": "api.clyp.it/oembed/"
  },
  {
    "s": [
      "app\\.ilovecoco\\.video/*/embed"
    ],
    "e": "app.ilovecoco.video/api/oembed.json"
  },
  {
    "s": [
      "codehs\\.com/editor/share_abacus/*"
    ],
    "e": "codehs.com/api/sharedprogram/1/oembed/"
  },
  {
    "s": [
      "codepen\\.io/*"
    ],
    "e": "codepen.io/api/oembed"
  },
  {
    "s": [
      "codepoints\\.net/*",
      "www\\.codepoints\\.net/*"
    ],
    "e": "codepoints.net/api/v1/oembed"
  },
  {
    "s": [
      "codesandbox\\.io/s/*",
      "codesandbox\\.io/embed/*"
    ],
    "e": "codesandbox.io/oembed"
  },
  {
    "s": [
      "www\\.collegehumor\\.com/video/*"
    ],
    "e": "www.collegehumor.com/oembed.json"
  },
  {
    "s": [
      "commaful\\.com/play/*"
    ],
    "e": "commaful.com/api/oembed/"
  },
  {
    "s": [
      "coub\\.com/view/*",
      "coub\\.com/embed/*"
    ],
    "e": "coub.com/api/oembed.json"
  },
  {
    "s": [
      "crowdranking\\.com/*/*"
    ],
    "e": "crowdranking.com/api/oembed.json"
  },
  {
    "s": [
      "crumb\\.sh/*"
    ],
    "e": "crumb.sh/oembed/"
  },
  {
    "s": [
      "cueup\\.io/user/*/sounds/*"
    ],
    "e": "gql.cueup.io/oembed"
  },
  {
    "s": [
      "*\\.curated\\.co/*"
    ],
    "e": "api.curated.co/oembed"
  },
  {
    "s": [
      "app\\.customerdb\\.com/share/*"
    ],
    "e": "app.customerdb.com/embed"
  },
  {
    "s": [
      "app\\.dadan\\.io/*",
      "stage\\.dadan\\.io/*"
    ],
    "e": "app.dadan.io/api/video/oembed"
  },
  {
    "s": [
      "www\\.dailymotion\\.com/video/*"
    ],
    "e": "www.dailymotion.com/services/oembed"
  },
  {
    "s": [
      "dalexni\\.com/i/*"
    ],
    "e": "dalexni.com/oembed/"
  },
  {
    "s": [
      "datawrapper\\.dwcdn\\.net/*"
    ],
    "e": "api.datawrapper.de/v3/oembed/"
  },
  {
    "s": [
      "*\\.deseret\\.com/*"
    ],
    "e": "embed.deseret.com/"
  },
  {
    "s": [
      "*\\.deviantart\\.com/art/*",
      "*\\.deviantart\\.com/*#/d*",
      "fav\\.me/*",
      "sta\\.sh/*",
      "*\\.deviantart\\.com/*/art/*",
      'sta\\.sh/*",',
      '*\\.deviantart\\.com/*#/d*"'
    ],
    "e": "backend.deviantart.com/oembed"
  },
  {
    "s": [
      "www\\.ultimedia\\.com/central/video/edit/id/*/topic_id/*/",
      "www\\.ultimedia\\.com/default/index/videogeneric/id/*/showtitle/1/viewnc/1",
      "www\\.ultimedia\\.com/default/index/videogeneric/id/*"
    ],
    "e": "www.ultimedia.com/api/search/oembed"
  },
  {
    "s": [
      "*\\.docdroid\\.net/*",
      "docdro\\.id/*",
      "*\\.docdroid\\.com/*"
    ],
    "e": "www.docdroid.net/api/oembed"
  },
  {
    "s": [
      "docswell\\.com/*/*",
      "www\\.docswell\\.com/*/*"
    ],
    "e": "www.docswell.com/service/oembed"
  },
  {
    "s": [
      "dotsub\\.com/view/*"
    ],
    "e": "dotsub.com/services/oembed"
  },
  {
    "s": [
      "www\\.dreambroker\\.com/channel/*/*"
    ],
    "e": "dreambroker.com/channel/oembed"
  },
  {
    "s": [
      "d\\.tube/v/*"
    ],
    "e": "api.d.tube/oembed"
  },
  {
    "s": [],
    "e": "www.edumedia-sciences.com/oembed.json"
  },
  {
    "s": [],
    "e": "www.edumedia-sciences.com/oembed.xml"
  },
  {
    "s": [
      "egliseinfo\\.catholique\\.fr/*"
    ],
    "e": "egliseinfo.catholique.fr/api/oembed"
  },
  {
    "s": [
      "embedery\\.com/widget/*"
    ],
    "e": "embedery.com/api/oembed"
  },
  {
    "s": [
      "music\\.enystre\\.com/lyrics/*"
    ],
    "e": "music.enystre.com/oembed"
  },
  {
    "s": [
      "ethfiddle\\.com/*"
    ],
    "e": "ethfiddle.com/services/oembed/"
  },
  {
    "s": [
      "evt\\.live/*",
      "evt\\.live/*/*",
      "live\\.eventlive\\.pro/*",
      "live\\.eventlive\\.pro/*/*"
    ],
    "e": "evt.live/api/oembed"
  },
  {
    "s": [
      "app\\.everviz\\.com/embed/*"
    ],
    "e": "api.everviz.com/oembed"
  },
  {
    "s": [
      "app\\.ex\\.co/stories/*",
      "www\\.playbuzz\\.com/*"
    ],
    "e": "oembed.ex.co/item"
  },
  {
    "s": [
      "eyrie\\.io/board/*",
      "eyrie\\.io/sparkfun/*"
    ],
    "e": "eyrie.io/v1/oembed"
  },
  {
    "s": [
      "www\\.facebook\\.com/*/posts/*",
      "www\\.facebook\\.com/*/activity/*",
      "www\\.facebook\\.com/*/photos/*",
      "www\\.facebook\\.com/photo\\.php?fbid=*",
      "www\\.facebook\\.com/photos/*",
      "www\\.facebook\\.com/permalink\\.php?story_fbid=*",
      "www\\.facebook\\.com/media/set?set=*",
      "www\\.facebook\\.com/questions/*",
      "www\\.facebook\\.com/notes/*/*/*"
    ],
    "e": "graph.facebook.com/v10.0/oembed_post"
  },
  {
    "s": [
      "www\\.facebook\\.com/*/videos/*",
      "www\\.facebook\\.com/video\\.php?id=*",
      "www\\.facebook\\.com/video\\.php?v=*"
    ],
    "e": "graph.facebook.com/v10.0/oembed_video"
  },
  {
    "s": [
      "www\\.facebook\\.com/*"
    ],
    "e": "graph.facebook.com/v10.0/oembed_page"
  },
  {
    "s": [
      "app\\.getfader\\.com/projects/*/publish"
    ],
    "e": "app.getfader.com/api/oembed"
  },
  {
    "s": [
      "faithlifetv\\.com/items/*",
      "faithlifetv\\.com/items/resource/*/*",
      "faithlifetv\\.com/media/*",
      "faithlifetv\\.com/media/assets/*",
      "faithlifetv\\.com/media/resource/*/*"
    ],
    "e": "faithlifetv.com/api/oembed"
  },
  {
    "s": [
      "*\\.fireworktv\\.com/*",
      "*\\.fireworktv\\.com/embed/*/v/*"
    ],
    "e": "www.fireworktv.com/oembed"
  },
  {
    "s": [
      "www\\.fite\\.tv/watch/*"
    ],
    "e": "www.fite.tv/oembed"
  },
  {
    "s": [
      "flat\\.io/score/*",
      "*\\.flat\\.io/score/*"
    ],
    "e": "flat.io/services/oembed"
  },
  {
    "s": [
      "*\\.flickr\\.com/photos/*",
      "flic\\.kr/p/*",
      "*\\.*\\.flickr\\.com/*/*"
    ],
    "e": "www.flickr.com/services/oembed/"
  },
  {
    "s": [
      "public\\.flourish\\.studio/visualisation/*",
      "public\\.flourish\\.studio/story/*"
    ],
    "e": "app.flourish.studio/api/v1/oembed"
  },
  {
    "s": [
      "fiso\\.foxsports\\.com\\.au/isomorphic-widget/*"
    ],
    "e": "fiso.foxsports.com.au/oembed"
  },
  {
    "s": [
      "framebuzz\\.com/v/*"
    ],
    "e": "framebuzz.com/oembed/"
  },
  {
    "s": [
      "framer\\.com/share/*",
      "framer\\.com/embed/*"
    ],
    "e": "api.framer.com/web/oembed"
  },
  {
    "s": [
      "*\\.geograph\\.org\\.uk/*",
      "*\\.geograph\\.co\\.uk/*",
      "*\\.geograph\\.ie/*",
      "*\\.wikimedia\\.org/*_geograph\\.org\\.uk_*"
    ],
    "e": "api.geograph.org.uk/api/oembed"
  },
  {
    "s": [
      "*\\.geograph\\.org\\.gg/*",
      "*\\.geograph\\.org\\.je/*",
      "channel-islands\\.geograph\\.org/*",
      "channel-islands\\.geographs\\.org/*",
      "*\\.channel\\.geographs\\.org/*"
    ],
    "e": "www.geograph.org.gg/api/oembed"
  },
  {
    "s": [
      "geo-en\\.hlipp\\.de/*",
      "geo\\.hlipp\\.de/*",
      "germany\\.geograph\\.org/*"
    ],
    "e": "geo.hlipp.de/restapi.php/api/oembed"
  },
  {
    "s": [
      "gty\\.im/*"
    ],
    "e": "embed.gettyimages.com/oembed"
  },
  {
    "s": [
      "gfycat\\.com/*",
      "www\\.gfycat\\.com/*"
    ],
    "e": "api.gfycat.com/v1/oembed"
  },
  {
    "s": [
      "www\\.gifnote\\.com/play/*"
    ],
    "e": "www.gifnote.com/services/oembed"
  },
  {
    "s": [
      "giphy\\.com/gifs/*",
      "giphy\\.com/clips/*",
      "gph\\.is/*",
      "media\\.giphy\\.com/media/*/giphy\\.gif"
    ],
    "e": "giphy.com/services/oembed"
  },
  {
    "s": [],
    "e": "gloria.tv/oembed/"
  },
  {
    "s": [
      "view\\.gmetri\\.com/*",
      "*\\.gmetri\\.com/*"
    ],
    "e": "embed.gmetri.com/oembed/"
  },
  {
    "s": [
      "app\\.gong\\.io/call?id=*"
    ],
    "e": "app.gong.io/oembed"
  },
  {
    "s": [
      "grain\\.co/highlight/*",
      "grain\\.co/share/*",
      "grain\\.com/share/*"
    ],
    "e": "api.grain.com/_/api/oembed"
  },
  {
    "s": [
      "gtchannel\\.com/watch/*"
    ],
    "e": "api.luminery.com/oembed"
  },
  {
    "s": [
      "gyazo\\.com/*"
    ],
    "e": "api.gyazo.com/api/oembed"
  },
  {
    "s": [
      "core\\.hash\\.ai/@*"
    ],
    "e": "api.hash.ai/oembed"
  },
  {
    "s": [
      "hearthis\\.at/*/*/",
      "hearthis\\.at/*/set/*/"
    ],
    "e": "hearthis.at/oembed/?format=json"
  },
  {
    "s": [
      "heyzine\\.com/flip-book/*",
      "*\\.hflip\\.co/*",
      "*\\.aflip\\.in/*"
    ],
    "e": "heyzine.com/api1/oembed"
  },
  {
    "s": [
      "player\\.hihaho\\.com/*"
    ],
    "e": "player.hihaho.com/services/oembed"
  },
  {
    "s": [
      "*\\.hippovideo\\.io/*"
    ],
    "e": "www.hippovideo.io/services/oembed"
  },
  {
    "s": [
      "homey\\.app/f/*",
      "homey\\.app/*/flow/*"
    ],
    "e": "homey.app/api/oembed/flow"
  },
  {
    "s": [
      "huffduffer\\.com/*/*"
    ],
    "e": "huffduffer.com/oembed"
  },
  {
    "s": [
      "www\\.hulu\\.com/watch/*"
    ],
    "e": "www.hulu.com/api/oembed.json"
  },
  {
    "s": [
      "*\\.idomoo\\.com/*"
    ],
    "e": "oembed.idomoo.com/oembed"
  },
  {
    "s": [
      "www\\.ifixit\\.com/Guide/View/*"
    ],
    "e": "www.ifixit.com/Embed"
  },
  {
    "s": [
      "ifttt\\.com/recipes/*"
    ],
    "e": "www.ifttt.com/oembed/"
  },
  {
    "s": [
      "www\\.iheart\\.com/podcast/*/*"
    ],
    "e": "www.iheart.com/oembed"
  },
  {
    "s": [
      "qr\\.imenupro\\.com/*"
    ],
    "e": "qr.imenupro.com/api/oembed"
  },
  {
    "s": [
      "incredible\\.dev/watch/*"
    ],
    "e": "oembed.incredible.dev/oembed"
  },
  {
    "s": [
      "player\\.indacolive\\.com/player/jwp/clients/*"
    ],
    "e": "player.indacolive.com/services/oembed"
  },
  {
    "s": [
      "infogram\\.com/*"
    ],
    "e": "infogram.com/oembed"
  },
  {
    "s": [
      "*\\.infoveave\\.net/E/*",
      "*\\.infoveave\\.net/P/*"
    ],
    "e": "infoveave.net/services/oembed/"
  },
  {
    "s": [
      "www\\.injurymap\\.com/exercises/*"
    ],
    "e": "www.injurymap.com/services/oembed"
  },
  {
    "s": [
      "www\\.inoreader\\.com/oembed/"
    ],
    "e": "www.inoreader.com/oembed/api/"
  },
  {
    "s": [
      "*\\.inphood\\.com/*"
    ],
    "e": "api.inphood.com/oembed"
  },
  {
    "s": [
      "instagram\\.com/*/p/*,",
      "www\\.instagram\\.com/*/p/*,",
      "instagram\\.com/p/*",
      "instagr\\.am/p/*",
      "www\\.instagram\\.com/p/*",
      "www\\.instagr\\.am/p/*",
      "instagram\\.com/tv/*",
      "instagr\\.am/tv/*",
      "www\\.instagram\\.com/tv/*",
      "www\\.instagr\\.am/tv/*",
      "www\\.instagram\\.com/reel/*",
      "instagram\\.com/reel/*",
      "instagr\\.am/reel/*"
    ],
    "e": "graph.facebook.com/v10.0/instagram_oembed"
  },
  {
    "s": [
      "ppa\\.insticator\\.com/embed-unit/*"
    ],
    "e": "www.insticator.com/oembed"
  },
  {
    "s": [
      "issuu\\.com/*/docs/*"
    ],
    "e": "issuu.com/oembed"
  },
  {
    "s": [
      "jovian\\.ml/*",
      "jovian\\.ml/viewer*",
      "*\\.jovian\\.ml/*",
      "jovian\\.ai/*",
      "jovian\\.ai/viewer*",
      "*\\.jovian\\.ai/*",
      "jovian\\.com/*",
      "jovian\\.com/viewer*",
      "*\\.jovian\\.com/*"
    ],
    "e": "api.jovian.com/oembed.json"
  },
  {
    "s": [
      "tv\\.kakao\\.com/channel/*/cliplink/*",
      "tv\\.kakao\\.com/m/channel/*/cliplink/*",
      "tv\\.kakao\\.com/channel/v/*",
      "tv\\.kakao\\.com/channel/*/livelink/*",
      "tv\\.kakao\\.com/m/channel/*/livelink/*",
      "tv\\.kakao\\.com/channel/l/*"
    ],
    "e": "tv.kakao.com/oembed"
  },
  {
    "s": [
      "www\\.kickstarter\\.com/projects/*"
    ],
    "e": "www.kickstarter.com/services/oembed"
  },
  {
    "s": [
      "www\\.kidoju\\.com/en/x/*/*",
      "www\\.kidoju\\.com/fr/x/*/*"
    ],
    "e": "www.kidoju.com/api/oembed"
  },
  {
    "s": [
      "halaman\\.email/form/*",
      "aplikasi\\.kirim\\.email/form/*"
    ],
    "e": "halaman.email/service/oembed"
  },
  {
    "s": [
      "kit\\.co/*/*"
    ],
    "e": "embed.kit.co/oembed"
  },
  {
    "s": [
      "www\\.kitchenbowl\\.com/recipe/*"
    ],
    "e": "www.kitchenbowl.com/oembed"
  },
  {
    "s": [
      "app\\.kmdr\\.sh/h/*",
      "app\\.kmdr\\.sh/history/*"
    ],
    "e": "api.kmdr.sh/services/oembed"
  },
  {
    "s": [
      "jdr\\.knacki\\.info/meuh/*"
    ],
    "e": "jdr.knacki.info/oembed"
  },
  {
    "s": [
      "knowledgepad\\.co/#/knowledge/*"
    ],
    "e": "api.spoonacular.com/knowledge/oembed"
  },
  {
    "s": [
      "*\\.kooapp\\.com/koo/*"
    ],
    "e": "embed.kooapp.com/services/oembed"
  },
  {
    "s": [
      "kurozora\\.app/episodes*",
      "kurozora\\.app/songs*"
    ],
    "e": "kurozora.app/oembed"
  },
  {
    "s": [
      "learningapps\\.org/*"
    ],
    "e": "learningapps.org/oembed.php"
  },
  {
    "s": [
      "umotion-test\\.univ-lemans\\.fr/video/*"
    ],
    "e": "umotion-test.univ-lemans.fr/oembed"
  },
  {
    "s": [
      "pod\\.univ-lille\\.fr/video/*"
    ],
    "e": "pod.univ-lille.fr/video/oembed"
  },
  {
    "s": [
      "place\\.line\\.me/businesses/*"
    ],
    "e": "place.line.me/oembed"
  },
  {
    "s": [
      "livestream\\.com/accounts/*/events/*",
      "livestream\\.com/accounts/*/events/*/videos/*",
      "livestream\\.com/*/events/*",
      "livestream\\.com/*/events/*/videos/*",
      "livestream\\.com/*/*",
      "livestream\\.com/*/*/videos/*"
    ],
    "e": "livestream.com/oembed"
  },
  {
    "s": [
      "lottiefiles\\.com/*",
      "*\\.lottiefiles\\.com/*"
    ],
    "e": "embed.lottiefiles.com/oembed"
  },
  {
    "s": [
      "app\\.ludus\\.one/*"
    ],
    "e": "app.ludus.one/oembed"
  },
  {
    "s": [
      "*\\.lumiere\\.is/v/*"
    ],
    "e": "admin.lumiere.is/api/services/oembed"
  },
  {
    "s": [
      "mathembed\\.com/latex?inputText=*"
    ],
    "e": "mathembed.com/oembed"
  },
  {
    "s": [],
    "e": "my.matterport.com/api/v1/models/oembed/"
  },
  {
    "s": [
      "me\\.me/i/*"
    ],
    "e": "me.me/oembed"
  },
  {
    "s": [
      "mdstrm\\.com/embed/*",
      "mdstrm\\.com/live-stream/*",
      "mdstrm\\.com/image/*"
    ],
    "e": "mdstrm.com/oembed"
  },
  {
    "s": [
      "medienarchiv\\.zhdk\\.ch/entries/*"
    ],
    "e": "medienarchiv.zhdk.ch/oembed.json"
  },
  {
    "s": [
      "mermaid\\.ink/img/*",
      "mermaid\\.ink/svg/*"
    ],
    "e": "mermaid.ink/services/oembed"
  },
  {
    "s": [
      "*\\.microsoftstream\\.com/video/*",
      "*\\.microsoftstream\\.com/channel/*"
    ],
    "e": "web.microsoftstream.com/oembed"
  },
  {
    "s": [
      "www\\.minervaknows\\.com/featured-recipes/*",
      "www\\.minervaknows\\.com/themes/*",
      "www\\.minervaknows\\.com/themes/*/recipes/*",
      "app\\.minervaknows\\.com/recipes/*",
      "app\\.minervaknows\\.com/recipes/*/follow"
    ],
    "e": "oembed.minervaknows.com"
  },
  {
    "s": [
      "miro\\.com/app/board/*"
    ],
    "e": "miro.com/api/v1/oembed"
  },
  {
    "s": [
      "www\\.mixcloud\\.com/*/*/"
    ],
    "e": "www.mixcloud.com/oembed/"
  },
  {
    "s": [
      "mixpanel\\.com/*"
    ],
    "e": "mixpanel.com/api/app/embed/oembed/"
  },
  {
    "s": [
      "www\\.mobypicture\\.com/user/*/view/*",
      "moby\\.to/*"
    ],
    "e": "api.mobypicture.com/oEmbed"
  },
  {
    "s": [
      "musicboxmaniacs\\.com/explore/melody/*"
    ],
    "e": "musicboxmaniacs.com/embed/"
  },
  {
    "s": [
      "mybeweeg\\.com/w/*"
    ],
    "e": "mybeweeg.com/services/oembed"
  },
  {
    "s": [
      "namchey\\.com/embeds/*"
    ],
    "e": "namchey.com/api/oembed"
  },
  {
    "s": [
      "*\\.nanoo\\.tv/link/*",
      "nanoo\\.tv/link/*",
      "*\\.nanoo\\.pro/link/*",
      "nanoo\\.pro/link/*",
      "media\\.zhdk\\.ch/signatur/*",
      "new\\.media\\.zhdk\\.ch/signatur/*"
    ],
    "e": "www.nanoo.tv/services/oembed"
  },
  {
    "s": [
      "www\\.nb\\.no/items/*"
    ],
    "e": "api.nb.no/catalog/v1/oembed"
  },
  {
    "s": [
      "naturalatlas\\.com/*",
      "naturalatlas\\.com/*/*",
      "naturalatlas\\.com/*/*/*",
      "naturalatlas\\.com/*/*/*/*"
    ],
    "e": "naturalatlas.com/oembed.json"
  },
  {
    "s": [
      "ndla\\.no/*"
    ],
    "e": "ndla.no/oembed"
  },
  {
    "s": [
      "liste\\.ndla\\.no/*"
    ],
    "e": "liste.ndla.no/oembed"
  },
  {
    "s": [
      "*\\.nfb\\.ca/film/*"
    ],
    "e": "www.nfb.ca/remote/services/oembed/"
  },
  {
    "s": [
      "nopaste\\.ml/*"
    ],
    "e": "oembed.nopaste.ml"
  },
  {
    "s": [
      "observablehq\\.com/@*/*",
      "observablehq\\.com/d/*",
      "observablehq\\.com/embed/*"
    ],
    "e": "api.observablehq.com/oembed"
  },
  {
    "s": [
      "www\\.odds\\.com\\.au/*",
      "odds\\.com\\.au/*"
    ],
    "e": "www.odds.com.au/api/oembed/"
  },
  {
    "s": [
      "song\\.link/*",
      "album\\.link/*",
      "artist\\.link/*",
      "playlist\\.link/*",
      "pods\\.link/*",
      "mylink\\.page/*",
      "odesli\\.co/*"
    ],
    "e": "song.link/oembed"
  },
  {
    "s": [
      "odysee\\.com/*/*",
      "odysee\\.com/*"
    ],
    "e": "odysee.com/$/oembed"
  },
  {
    "s": [
      "official\\.fm/tracks/*",
      "official\\.fm/playlists/*"
    ],
    "e": "official.fm/services/oembed.json"
  },
  {
    "s": [
      "omniscope\\.me/*"
    ],
    "e": "omniscope.me/_global_/oembed/json"
  },
  {
    "s": [
      "omny\\.fm/shows/*"
    ],
    "e": "omny.fm/oembed"
  },
  {
    "s": [
      "orbitvu\\.co/001/*/ov3601/view",
      "orbitvu\\.co/001/*/ov3601/*/view",
      "orbitvu\\.co/001/*/ov3602/*/view",
      "orbitvu\\.co/001/*/2/orbittour/*/view",
      "orbitvu\\.co/001/*/1/2/orbittour/*/view"
    ],
    "e": "orbitvu.co/service/oembed"
  },
  {
    "s": [
      "outplayed\\.tv/media/*"
    ],
    "e": "outplayed.tv/oembed"
  },
  {
    "s": [
      "overflow\\.io/s/*",
      "overflow\\.io/embed/*"
    ],
    "e": "overflow.io/services/oembed"
  },
  {
    "s": [
      "www\\.oz\\.com/*/video/*"
    ],
    "e": "core.oz.com/oembed"
  },
  {
    "s": [
      "padlet\\.com/*"
    ],
    "e": "padlet.com/oembed/"
  },
  {
    "s": [
      "*\\.tv\\.pandavideo\\.com\\.br/embed/?v=*",
      "*\\.tv\\.pandavideo\\.com\\.br/*/playlist\\.m3u8",
      "dashboard\\.pandavideo\\.com\\.br/#/videos/*"
    ],
    "e": "api-v2.pandavideo.com.br/oembed"
  },
  {
    "s": [
      "pastery\\.net/*",
      "www\\.pastery\\.net/*"
    ],
    "e": "www.pastery.net/oembed"
  },
  {
    "s": [
      "www\\.picturelfy\\.com/p/*"
    ],
    "e": "api.picturelfy.com/service/oembed/"
  },
  {
    "s": [
      "*\\.builder\\.pikasso\\.xyz/embed/*"
    ],
    "e": "builder.pikasso.xyz/api/oembed"
  },
  {
    "s": [],
    "e": "beta.pingvp.com.kpnis.nl/p/oembed.php"
  },
  {
    "s": [
      "tools\\.pinpoll\\.com/embed/*"
    ],
    "e": "tools.pinpoll.com/oembed"
  },
  {
    "s": [
      "www\\.pinterest\\.com/*"
    ],
    "e": "www.pinterest.com/oembed.json"
  },
  {
    "s": [
      "player\\.pitchhub\\.com/en/public/player/*"
    ],
    "e": "player.pitchhub.com/en/public/oembed"
  },
  {
    "s": [
      "store\\.pixdor\\.com/place-marker-widget/*/show",
      "store\\.pixdor\\.com/map/*/show"
    ],
    "e": "store.pixdor.com/oembed"
  },
  {
    "s": [
      "app\\.plusdocs\\.com/*/snapshots/*",
      "app\\.plusdocs\\.com/*/pages/edit/*",
      "app\\.plusdocs\\.com/*/pages/share/*"
    ],
    "e": "app.plusdocs.com/oembed"
  },
  {
    "s": [
      "*\\.podbean\\.com/e/*"
    ],
    "e": "api.podbean.com/v1/oembed"
  },
  {
    "s": [
      "*\\.polldaddy\\.com/s/*",
      "*\\.polldaddy\\.com/poll/*",
      "*\\.polldaddy\\.com/ratings/*"
    ],
    "e": "polldaddy.com/oembed/"
  },
  {
    "s": [
      "portfolium\\.com/entry/*"
    ],
    "e": "api.portfolium.com/oembed"
  },
  {
    "s": [
      "present\\.do/decks/*"
    ],
    "e": "gateway.cobalt.run/present/decks/oembed"
  },
  {
    "s": [
      "prezi\\.com/v/*",
      "*\\.prezi\\.com/v/*"
    ],
    "e": "prezi.com/v/oembed"
  },
  {
    "s": [
      "qtpi\\.gg/fashion/*"
    ],
    "e": "qtpi.gg/fashion/oembed"
  },
  {
    "s": [
      "www\\.quiz\\.biz/quizz-*\\.html"
    ],
    "e": "www.quiz.biz/api/oembed"
  },
  {
    "s": [
      "www\\.quizz\\.biz/quizz-*\\.html"
    ],
    "e": "www.quizz.biz/api/oembed"
  },
  {
    "s": [
      "play\\.radiopublic\\.com/*",
      "radiopublic\\.com/*",
      "www\\.radiopublic\\.com/*",
      "*\\.radiopublic\\.com/*"
    ],
    "e": "oembed.radiopublic.com/oembed"
  },
  {
    "s": [
      "raindrop\\.io/*",
      "raindrop\\.io/*/*",
      "raindrop\\.io/*/*/*",
      "raindrop\\.io/*/*/*/*"
    ],
    "e": "pub.raindrop.io/api/oembed"
  },
  {
    "s": [
      "www\\.rcvis\\.com/v/*",
      "www\\.rcvis\\.com/visualize=*",
      "www\\.rcvis\\.com/ve/*",
      "www\\.rcvis\\.com/visualizeEmbedded=*"
    ],
    "e": "animatron.com/oembed"
  },
  {
    "s": [
      "reddit\\.com/r/*/comments/*/*",
      "www\\.reddit\\.com/r/*/comments/*/*"
    ],
    "e": "www.reddit.com/oembed"
  },
  {
    "s": [
      "rwire\\.com/*"
    ],
    "e": "publisher.releasewire.com/oembed/"
  },
  {
    "s": [
      "repl\\.it/@*/*",
      "replit\\.com/@*/*"
    ],
    "e": "replit.com/data/oembed"
  },
  {
    "s": [
      "www\\.reverbnation\\.com/*",
      "www\\.reverbnation\\.com/*/songs/*"
    ],
    "e": "www.reverbnation.com/oembed"
  },
  {
    "s": [
      "roomshare\\.jp/post/*",
      "roomshare\\.jp/en/post/*"
    ],
    "e": "roomshare.jp/en/oembed.json"
  },
  {
    "s": [
      "roosterteeth\\.com/*"
    ],
    "e": "roosterteeth.com/oembed"
  },
  {
    "s": [],
    "e": "rumble.com/api/Media/oembed.json"
  },
  {
    "s": [
      "embed\\.runkit\\.com/*,"
    ],
    "e": "embed.runkit.com/oembed"
  },
  {
    "s": [
      "octopus\\.saooti\\.com/main/pub/podcast/*"
    ],
    "e": "octopus.saooti.com/oembed"
  },
  {
    "s": [
      "videos\\.sapo\\.pt/*"
    ],
    "e": "videos.sapo.pt/oembed"
  },
  {
    "s": [
      "console\\.screen9\\.com/*",
      "*\\.screen9\\.tv/*"
    ],
    "e": "api.screen9.com/oembed"
  },
  {
    "s": [
      "www\\.screencast\\.com/*"
    ],
    "e": "api.screencast.com/external/oembed"
  },
  {
    "s": [
      "www\\.screenr\\.com/*/"
    ],
    "e": "www.screenr.com/api/oembed.json"
  },
  {
    "s": [
      "www\\.scribblemaps\\.com/maps/view/*",
      "scribblemaps\\.com/maps/view/*"
    ],
    "e": "scribblemaps.com/api/services/oembed.json"
  },
  {
    "s": [
      "www\\.scribd\\.com/doc/*"
    ],
    "e": "www.scribd.com/services/oembed/"
  },
  {
    "s": [
      "embed\\.sendtonews\\.com/oembed/*"
    ],
    "e": "embed.sendtonews.com/services/oembed"
  },
  {
    "s": [
      "www\\.shortnote\\.jp/view/notes/*"
    ],
    "e": "www.shortnote.jp/oembed/"
  },
  {
    "s": [
      "shoudio\\.com/*",
      "shoud\\.io/*"
    ],
    "e": "shoudio.com/api/oembed"
  },
  {
    "s": [
      "app\\.getshow\\.io/iframe/*",
      "*\\.getshow\\.io/share/*"
    ],
    "e": "api.getshow.io/oembed.json"
  },
  {
    "s": [
      "showtheway\\.io/to/*"
    ],
    "e": "showtheway.io/oembed"
  },
  {
    "s": [
      "simplecast\\.com/s/*"
    ],
    "e": "simplecast.com/oembed"
  },
  {
    "s": [
      "onsizzle\\.com/i/*"
    ],
    "e": "onsizzle.com/oembed"
  },
  {
    "s": [
      "sketchfab\\.com/*models/*",
      "sketchfab\\.com/*/folders/*"
    ],
    "e": "sketchfab.com/oembed"
  },
  {
    "s": [
      "www\\.slideshare\\.net/*/*",
      "fr\\.slideshare\\.net/*/*",
      "de\\.slideshare\\.net/*/*",
      "es\\.slideshare\\.net/*/*",
      "pt\\.slideshare\\.net/*/*"
    ],
    "e": "www.slideshare.net/api/oembed/2"
  },
  {
    "s": [
      "smashnotes\\.com/p/*",
      "smashnotes\\.com/p/*/e/* - https://smashnotes\\.com/p/*/e/*/s/*"
    ],
    "e": "smashnotes.com/services/oembed"
  },
  {
    "s": [
      "open\\.smeme\\.com/*"
    ],
    "e": "open.smeme.com/api/oembed"
  },
  {
    "s": [
      "www\\.smrthi\\.com/book/*"
    ],
    "e": "www.smrthi.com/api/oembed"
  },
  {
    "s": [
      "*\\.smugmug\\.com/*"
    ],
    "e": "api.smugmug.com/services/oembed/"
  },
  {
    "s": [
      "www\\.socialexplorer\\.com/*/explore",
      "www\\.socialexplorer\\.com/*/view",
      "www\\.socialexplorer\\.com/*/edit",
      "www\\.socialexplorer\\.com/*/embed"
    ],
    "e": "www.socialexplorer.com/services/oembed/"
  },
  {
    "s": [
      "soundcloud\\.com/*",
      "on\\.soundcloud\\.com/*",
      "soundcloud\\.app\\.goog\\.gl/*"
    ],
    "e": "soundcloud.com/oembed"
  },
  {
    "s": [
      "speakerdeck\\.com/*/*"
    ],
    "e": "speakerdeck.com/oembed.json"
  },
  {
    "s": [
      "open\\.spotify\\.com/*",
      "spotify:*"
    ],
    "e": "open.spotify.com/oembed"
  },
  {
    "s": [
      "*\\.spotlightr\\.com/watch/*",
      "*\\.spotlightr\\.com/publish/*",
      "*\\.cdn\\.spotlightr\\.com/watch/*",
      "*\\.cdn\\.spotlightr\\.com/publish/*"
    ],
    "e": "api.spotlightr.com/getOEmbed"
  },
  {
    "s": [
      "*\\.spreaker\\.com/*"
    ],
    "e": "api.spreaker.com/oembed"
  },
  {
    "s": [
      "sproutvideo\\.com/videos/*",
      "*\\.vids\\.io/videos/*"
    ],
    "e": "sproutvideo.com/oembed.json"
  },
  {
    "s": [
      "purl\\.stanford\\.edu/*"
    ],
    "e": "purl.stanford.edu/embed.json"
  },
  {
    "s": [
      "streamable\\.com/*"
    ],
    "e": "api.streamable.com/oembed.json"
  },
  {
    "s": [
      "s3m\\.io/*",
      "23m\\.io/*"
    ],
    "e": "streamio.com/api/v1/oembed"
  },
  {
    "s": [
      "subscribi\\.io/api/oembed*"
    ],
    "e": "subscribi.io/api/oembed"
  },
  {
    "s": [
      "www\\.sudomemo\\.net/watch/*",
      "flipnot\\.es/*"
    ],
    "e": "www.sudomemo.net/oembed"
  },
  {
    "s": [
      "www\\.sutori\\.com/story/*"
    ],
    "e": "www.sutori.com/api/oembed"
  },
  {
    "s": [
      "sway\\.com/*",
      "www\\.sway\\.com/*"
    ],
    "e": "sway.com/api/v1.0/oembed"
  },
  {
    "s": [
      "sway\\.office\\.com/*"
    ],
    "e": "sway.office.com/api/v1.0/oembed"
  },
  {
    "s": [
      "share\\.synthesia\\.io/*"
    ],
    "e": "69jr5v75rc.execute-api.eu-west-1.amazonaws.com/prod/v2/oembed"
  },
  {
    "s": [
      "ted\\.com/talks/*",
      "www\\.ted\\.com/talks/*"
    ],
    "e": "www.ted.com/services/v1/oembed.json"
  },
  {
    "s": [
      "www\\.nytimes\\.com/svc/oembed",
      "nytimes\\.com/*",
      "*\\.nytimes\\.com/*"
    ],
    "e": "www.nytimes.com/svc/oembed/json/"
  },
  {
    "s": [
      "theysaidso\\.com/image/*"
    ],
    "e": "theysaidso.com/extensions/oembed/"
  },
  {
    "s": [
      "www\\.tickcounter\\.com/countdown/*",
      "www\\.tickcounter\\.com/countup/*",
      "www\\.tickcounter\\.com/ticker/*",
      "www\\.tickcounter\\.com/worldclock/*"
    ],
    "e": "www.tickcounter.com/oembed"
  },
  {
    "s": [
      "www\\.tiktok\\.com/*",
      "www\\.tiktok\\.com/*/video/*"
    ],
    "e": "www.tiktok.com/oembed"
  },
  {
    "s": [
      "www\\.toornament\\.com/tournaments/*/information",
      "www\\.toornament\\.com/tournaments/*/registration/",
      "www\\.toornament\\.com/tournaments/*/matches/schedule",
      "www\\.toornament\\.com/tournaments/*/stages/*/"
    ],
    "e": "widget.toornament.com/oembed"
  },
  {
    "s": [
      "www\\.topy\\.se/image/*"
    ],
    "e": "www.topy.se/oembed/"
  },
  {
    "s": [
      "app-test\\.totango\\.com/*"
    ],
    "e": "app-test.totango.com/oembed"
  },
  {
    "s": [
      "trinitymedia\\.ai/player/*"
    ],
    "e": "trinitymedia.ai/player/trinity-oembed"
  },
  {
    "s": [
      "*\\.tumblr\\.com/post/*"
    ],
    "e": "www.tumblr.com/oembed/1.0"
  },
  {
    "s": [
      "www\\.tuxx\\.be/*"
    ],
    "e": "www.tuxx.be/services/oembed"
  },
  {
    "s": [
      "play\\.tvcf\\.co\\.kr/*",
      "*\\.tvcf\\.co\\.kr/*"
    ],
    "e": "play.tvcf.co.kr/rest/oembed"
  },
  {
    "s": [
      "twinmotion\\.unrealengine\\.com/presentation/*",
      "twinmotion\\.unrealengine\\.com/panorama/*"
    ],
    "e": "twinmotion.unrealengine.com/oembed"
  },
  {
    "s": [
      "twitter\\.com/*",
      "twitter\\.com/*/status/*",
      "*\\.twitter\\.com/*/status/*"
    ],
    "e": "publish.twitter.com/oembed"
  },
  {
    "s": [
      "play\\.typecast\\.ai/s/*",
      "play\\.typecast\\.ai/e/*",
      "play\\.typecast\\.ai/*"
    ],
    "e": "play.typecast.ai/oembed"
  },
  {
    "s": [],
    "e": "typlog.com/oembed"
  },
  {
    "s": [
      "uapod\\.univ-antilles\\.fr/video/*"
    ],
    "e": "uapod.univ-antilles.fr/oembed"
  },
  {
    "s": [
      "map\\.cam\\.ac\\.uk/*"
    ],
    "e": "map.cam.ac.uk/oembed/"
  },
  {
    "s": [
      "mediatheque\\.univ-paris1\\.fr/video/*"
    ],
    "e": "mediatheque.univ-paris1.fr/oembed"
  },
  {
    "s": [
      "pod\\.u-pec\\.fr/video/*"
    ],
    "e": "pod.u-pec.fr/oembed"
  },
  {
    "s": [
      "*\\.ustream\\.tv/*",
      "*\\.ustream\\.com/*"
    ],
    "e": "www.ustream.tv/oembed"
  },
  {
    "s": [
      "*\\.ustudio\\.com/embed/*",
      "*\\.ustudio\\.com/embed/*/*"
    ],
    "e": "app.ustudio.com/api/v2/oembed"
  },
  {
    "s": [
      "veer\\.tv/videos/*"
    ],
    "e": "api.veer.tv/oembed"
  },
  {
    "s": [
      "veervr\\.tv/videos/*"
    ],
    "e": "api.veervr.tv/oembed"
  },
  {
    "s": [
      "www\\.vevo\\.com/*"
    ],
    "e": "www.vevo.com/oembed"
  },
  {
    "s": [
      "videfit\\.com/videos/*"
    ],
    "e": "videfit.com/oembed"
  },
  {
    "s": [
      "vidmount\\.com/*"
    ],
    "e": "vidmount.com/oembed"
  },
  {
    "s": [
      "*\\.vidyard\\.com/*",
      "*\\.hubs\\.vidyard\\.com/*"
    ],
    "e": "api.vidyard.com/dashboard/v1.1/oembed"
  },
  {
    "s": [
      "vimeo\\.com/*",
      "vimeo\\.com/album/*/video/*",
      "vimeo\\.com/channels/*/*",
      "vimeo\\.com/groups/*/videos/*",
      "vimeo\\.com/ondemand/*/*",
      "player\\.vimeo\\.com/video/*"
    ],
    "e": "vimeo.com/api/oembed.json"
  },
  {
    "s": [
      "www\\.viously\\.com/*/*"
    ],
    "e": "www.viously.com/oembed"
  },
  {
    "s": [
      "vizydrop\\.com/shared/*"
    ],
    "e": "vizydrop.com/oembed"
  },
  {
    "s": [
      "vlipsy\\.com/*"
    ],
    "e": "vlipsy.com/oembed"
  },
  {
    "s": [
      "www\\.vlive\\.tv/video/*"
    ],
    "e": "www.vlive.tv/oembed"
  },
  {
    "s": [
      "*\\.vouchfor\\.com/*"
    ],
    "e": "embed.vouchfor.com/v1/oembed"
  },
  {
    "s": [
      "article\\.voxsnap\\.com/*/*"
    ],
    "e": "data.voxsnap.com/oembed"
  },
  {
    "s": [
      "waltrack\\.net/product/*"
    ],
    "e": "waltrack.net/oembed"
  },
  {
    "s": [
      "watch\\.wave\\.video/*",
      "embed\\.wave\\.video/*"
    ],
    "e": "embed.wave.video/oembed"
  },
  {
    "s": [
      "play\\.wecandeo\\.com/video/v/*"
    ],
    "e": "play.wecandeo.com/oembed/"
  },
  {
    "s": [
      "whimsical\\.com/*"
    ],
    "e": "whimsical.com/api/oembed"
  },
  {
    "s": [
      "fast\\.wistia\\.com/embed/iframe/*",
      "fast\\.wistia\\.com/embed/playlists/*",
      "*\\.wistia\\.com/medias/*"
    ],
    "e": "fast.wistia.com/oembed.json"
  },
  {
    "s": [
      "*\\.wizer\\.me/learn/*",
      "*\\.wizer\\.me/preview/*"
    ],
    "e": "app.wizer.me/api/oembed.json"
  },
  {
    "s": [
      "wokwi\\.com/share/*"
    ],
    "e": "wokwi.com/api/oembed"
  },
  {
    "s": [
      "*\\.wolframcloud\\.com/*"
    ],
    "e": "www.wolframcloud.com/oembed"
  },
  {
    "s": [
      "wordpress\\.com/*",
      "*\\.wordpress\\.com/*",
      "*\\.*\\.wordpress\\.com/*",
      "wp\\.me/*"
    ],
    "e": "public-api.wordpress.com/oembed/"
  },
  {
    "s": [
      "*\\.youtube\\.com/watch*",
      "*\\.youtube\\.com/v/*",
      "youtu\\.be/*",
      "*\\.youtube\\.com/playlist?list=*",
      "youtube\\.com/playlist?list=*",
      "*\\.youtube\\.com/shorts*"
    ],
    "e": "www.youtube.com/oembed"
  },
  {
    "s": [
      "app\\.zeplin\\.io/project/*/screen/*",
      "app\\.zeplin\\.io/project/*/screen/*/version/*",
      "app\\.zeplin\\.io/project/*/styleguide/components?coid=*",
      "app\\.zeplin\\.io/styleguide/*/components?coid=*"
    ],
    "e": "app.zeplin.io/embed"
  },
  {
    "s": [
      "app\\.zingsoft\\.com/embed/*",
      "app\\.zingsoft\\.com/view/*"
    ],
    "e": "app.zingsoft.com/oembed"
  },
  {
    "s": [
      "*\\.znipe\\.tv/*"
    ],
    "e": "api.znipe.tv/v3/oembed/"
  },
  {
    "s": [
      "srv2\\.zoomable\\.ca/viewer\\.php*"
    ],
    "e": "srv2.zoomable.ca/oembed"
  }
];

// src/utils/provider.js
var toRegExp = (scheme = "") => {
  return new RegExp(scheme.replace(/\\./g, ".").replace(/\*/g, "(.*)").replace(/\?/g, "\\?").replace(/,$/g, ""), "i");
};
var uniquify = (arr = []) => {
  return [...new Set(arr)];
};
var undotted = (scheme = "") => {
  return scheme.replace(/\./g, "\\.");
};
var removeProtocol = (url) => {
  return url.replace("https://", "").replace("http://", "");
};
var simplify = (providers2 = []) => {
  return providers2.map((item) => {
    const {
      endpoints
    } = item;
    return endpoints.map((endpoint) => {
      const { schemes = [], url } = endpoint;
      const patterns = schemes.length > 0 ? uniquify(schemes.map(removeProtocol).map(undotted)) : [];
      return {
        s: patterns,
        e: removeProtocol(url).replace(/\{format\}/g, "json")
      };
    });
  }).reduce((prev, curr) => {
    return prev.concat(curr);
  }, []);
};
var providersFromList = (providers2 = []) => {
  return providers2.map((provider) => {
    const { e: endpoint, s: schemes } = provider;
    return {
      endpoint: `https://${endpoint}`,
      schemes: schemes.map(toRegExp)
    };
  });
};
var store = {
  providers: providersFromList(providers)
};
var get = () => {
  return [...store.providers];
};
var set = (providers2 = []) => {
  store.providers = providersFromList(simplify(providers2));
  return store.providers.length;
};
var compare = (url = "", endpoint = "", schemes = []) => {
  if (!schemes.length) {
    const domain = getDomain(url);
    const endpointDomain = getDomain(endpoint);
    return domain === endpointDomain;
  }
  return schemes.some((scheme) => {
    return url.match(scheme);
  });
};
var find = (url = "") => {
  if (!isValid(url)) {
    return null;
  }
  const providers2 = get();
  for (let i = 0; i < providers2.length; i++) {
    const { endpoint, schemes } = providers2[i];
    const isMatched = compare(url, endpoint, schemes);
    if (isMatched) {
      return {
        schemes,
        endpoint,
        url
      };
    }
  }
  return null;
};
var has = (url = "") => {
  return find(url) !== null;
};
var getEndpoint = (url) => {
  const p = find(url);
  return p ? p.endpoint : null;
};

// src/main.js
var extract = async (url, params = {}, options = {}) => {
  if (!isValid(url)) {
    throw new Error("Invalid input URL");
  }
  const endpoint = getEndpoint(url);
  if (!endpoint) {
    throw new Error(`No provider found with given url "${url}"`);
  }
  const data = await fetchEmbed_default(url, params, endpoint, options);
  return data;
};
export {
  extract,
  find as findProvider,
  has as hasProvider,
  set as setProviderList
};
