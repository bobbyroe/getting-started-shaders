#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;

void main () {
  vec2 st = gl_FragCoord.xy / resolution;
  st.x *= resolution.x / resolution.y;
  float dist = distance(st, vec2(0.4, 0.5)) * 2.0;
  dist = step(0.5, dist);
  vec3 hue = 0.5 + 0.5 * cos(time + st.xyx + vec3(1.0, 2.0, 4.0));
  vec3 color = vec3(1.0 - dist) * hue;
  gl_FragColor = vec4(color, 1.0);
}