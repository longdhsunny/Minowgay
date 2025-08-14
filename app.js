
// Minimal stubs so onclick handlers don't break after splitting.
// You can later replace with real logic as needed.

function uiToggle(el){
  try{
    el.classList.toggle('on');
    if(el.dataset && el.dataset.key){
      const state = JSON.parse(localStorage.getItem('dp_state')||'{}');
      state[el.dataset.key] = el.classList.contains('on');
      localStorage.setItem('dp_state', JSON.stringify(state));
    }
  }catch(e){ console.warn(e); }
}

function saveState(){
  try{
    const state = JSON.parse(localStorage.getItem('dp_state')||'{}');
    ['w-ump','w-mp40','w-m1887','w-ak'].forEach(id=>{
      const box = document.getElementById(id);
      if(box) state[id] = !!box.checked;
    });
    const aim = document.getElementById('aim-range');
    if(aim) state['aimlock_strength'] = aim.value;
    const sensi = document.getElementById('sensi-range');
    if(sensi) state['sensi_dpi'] = sensi.value;
    const lag = document.getElementById('lag-level');
    if(lag) state['lag_level'] = lag.value;
    const boost = document.getElementById('boost-level');
    if(boost) state['boost_profile'] = boost.value;
    localStorage.setItem('dp_state', JSON.stringify(state));
    console.log('Saved state:', state);
  }catch(e){ console.warn(e); }
}

function setAllWeapons(flag){
  ['w-ump','w-mp40','w-m1887','w-ak'].forEach(id=>{
    const box = document.getElementById(id);
    if(box){ box.checked = !!flag; }
  });
  saveState();
}

function applyPreset(){
  saveState();
  alert('Preset applied (demo).');
}

function resetAll(){
  try{
    localStorage.removeItem('dp_state');
    location.reload();
  }catch(e){ console.warn(e); }
}

// On load: hydrate from saved state
(function(){
  try{
    const state = JSON.parse(localStorage.getItem('dp_state')||'{}');
    if(state['aimlock']){
      const t = document.querySelector('.toggle[data-key="aimlock"]');
      if(t) t.classList.add('on');
    }
    if(state['sensi']){
      const t = document.querySelector('.toggle[data-key="sensi"]');
      if(t) t.classList.add('on');
    }
    if(state['fixlag']){
      const t = document.querySelector('.toggle[data-key="fixlag"]');
      if(t) t.classList.add('on');
    }
    if(state['boost']){
      const t = document.querySelector('.toggle[data-key="boost"]');
      if(t) t.classList.add('on');
    }
    ['w-ump','w-mp40','w-m1887','w-ak'].forEach(id=>{
      const box = document.getElementById(id);
      if(box && (id in state)) box.checked = !!state[id];
    });
    if('aimlock_strength' in state){
      const aim = document.getElementById('aim-range');
      if(aim){
        aim.value = state['aimlock_strength'];
        const out = document.getElementById('aim-val');
        if(out) out.textContent = state['aimlock_strength'];
      }
    }
    if('sensi_dpi' in state){
      const sensi = document.getElementById('sensi-range');
      if(sensi){
        sensi.value = state['sensi_dpi'];
        const out = document.getElementById('sensi-val');
        if(out) out.textContent = state['sensi_dpi'] + ' DPI';
      }
    }
    if('lag_level' in state){
      const lag = document.getElementById('lag-level');
      if(lag){
        lag.value = state['lag_level'];
        const out = document.getElementById('lag-val');
        if(out) out.textContent = state['lag_level'];
      }
    }
    if('boost_profile' in state){
      const boost = document.getElementById('boost-level');
      if(boost){
        boost.value = state['boost_profile'];
        const out = document.getElementById('boost-val');
        if(out) out.textContent = state['boost_profile'];
      }
    }
  }catch(e){ console.warn(e); }
})();
