"""Build the private QA deliverable; reference pixels never enter application assets."""
from pathlib import Path
import json
from PIL import Image, ImageDraw
root=Path(__file__).resolve().parent.parent
qa=root/'qa'
sizes=['1440x900','1280x800','390x844']
regions={'hero':'','work':'-work','gallery':'-gallery','about':'-about','footer':'-footer','full':'-full'}
summary={}
for size in sizes:
 reference=json.loads((qa/'reference'/f'{size}.json').read_text())
 rounds={}
 for round in ['round-1','round-2']:
  local=json.loads((qa/round/f'{size}.json').read_text())['metrics']
  rounds[round]={selector:{'y_delta_px':float(f"{local[selector][0]['y']-reference[selector][0]['y']:.3f}"),'height_delta_px':float(f"{local[selector][0]['height']-reference[selector][0]['height']:.3f}")} for selector in local if local[selector] and reference.get(selector)}
 summary[size]=rounds
 for name,suffix in regions.items():
  if name=='full':continue
  left=Image.open(qa/'reference'/f'{size}{suffix}.png').convert('RGB')
  right=Image.open(qa/'round-2'/f'{size}{suffix}.png').convert('RGB')
  output=Image.new('RGB',(left.width+right.width,max(left.height,right.height)+40),'#242321')
  d=ImageDraw.Draw(output);d.text((16,13),'REFERENCE / mikewilcockdesign.com',fill='#edeae4');d.text((left.width+16,13),'LOCAL / independent Phase 1 recreation',fill='#7fa8ff')
  output.paste(left,(0,40));output.paste(right,(left.width,40))
  (qa/'comparisons').mkdir(exist_ok=True);output.save(qa/'comparisons'/f'{size}-{name}.png',optimize=True)
(qa/'geometry-summary.json').write_text(json.dumps(summary,indent=2))
html='''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Phase 1 · 参考对比</title><style>
*{box-sizing:border-box}body{margin:0;background:#111010;color:#edeae4;font:15px/1.5 system-ui}header{padding:24px;max-width:1600px;margin:auto}h1{font-size:26px;margin:0 0 10px}p{color:#b9b4ac;max-width:1000px}nav{display:flex;flex-wrap:wrap;gap:20px;margin-top:20px}label{display:flex;gap:8px;align-items:center}select{font:inherit;color:inherit;background:#242321;border:1px solid #555;padding:8px;border-radius:4px}main{padding:0 20px 30px}.captions{display:grid;grid-template-columns:1fr 1fr;gap:12px}.captions p{margin:12px 0}#screens{display:grid;grid-template-columns:1fr 1fr;gap:12px;align-items:start}img{display:block;width:100%;height:auto;border:1px solid #3b3835}a{color:#7fa8ff}small{color:#8f8a82}@media(max-width:700px){header{padding:20px}nav{gap:12px}#screens{gap:6px}main{padding:0 8px}}
</style><header><h1>Phase 1 — 参考与本地对比</h1><p>同尺寸 Chrome 截图，左侧参考，右侧独立实现。可切换三个视口、两轮优化和各主要区域。参考截图仅用于本次私人对比，不属于应用素材。作品图片、Logo 和视频按要求替换；动画画面及时间可能不同步。</p><nav><label>视口<select id="size"><option>1440x900</option><option>1280x800</option><option>390x844</option></select></label><label>轮次<select id="round"><option value="round-2">第二轮 / 最终</option><option value="round-1">第一轮</option></select></label><label>区域<select id="region"><option value="">Hero</option><option value="-work">Selected Work</option><option value="-gallery">Gallery</option><option value="-about">About</option><option value="-footer">Footer</option><option value="-hover">字体 Hover（桌面）</option><option value="-full">完整页面</option></select></label><a href="http://127.0.0.1:5173/">打开本地体验</a><a href="geometry-summary.json">查看测量差异 JSON</a></nav></header><main><div class="captions"><p>Reference · mikewilcockdesign.com</p><p>Local · Phase 1</p></div><div id="screens"><img id="ref" alt="参考网站截图"><img id="local" alt="本地网站截图"></div></main><script>
const inputs=[...document.querySelectorAll('select')];function show(){if(document.querySelector('#size').value==='390x844'&&document.querySelector('#region').value==='-hover')document.querySelector('#region').value='';const size=document.querySelector('#size').value,round=document.querySelector('#round').value,region=document.querySelector('#region').value;document.querySelector('#ref').src='reference/'+size+region+'.png';document.querySelector('#local').src=round+'/'+size+region+'.png'}inputs.forEach(el=>el.addEventListener('change',show));show();</script></html>'''
(qa/'index.html').write_text(html)
