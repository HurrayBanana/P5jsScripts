/*
grab substring of t from start index with width amount of characters
see if string is shorter than width
if it is concatenate enough characters from the 0 (left portion) of t
*/
function segment(t, start, width) {
  tt = t.substring(start,start+width);
  l = tt.length;
  if (l < width)
    tt += t.substring(0, width - l);
  return tt;
}
