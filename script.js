document.addEventListener('DOMContentLoaded', function() {

    // 쿠키 처리 유틸리티 함수
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // 동일 항목 배열 (두 사람 모두 동일한 항목을 사용)
    var sections = [
        {
            title: "기본",
            items: [
                { id: 'item1', text: '여권 -프린트' },
                { id: 'item2', text: 'e심' },
                { id: 'item3', text: '보험증확인' },
                { id: 'item4', text: '항공권(스마트패스/전자거시기)' },
                { id: 'item5', text: '숙소확인 -프린트' },
                { id: 'item6', text: '트래블카드' },
                { id: 'item7', text: '현금 - 민경이' },
                { id: 'item8', text: '워치' },
                { id: 'item9', text: '의약품(타이레놀, 소화제)' },
                { id: 'item10', text: '어댑터(변환기 2개 가져감)' },
                { id: 'item11', text: '충전기(라이트닝/C/워치)' },
                { id: 'item12', text: '(충전중) 보조배터리' },
                { id: 'item13', text: '돈지갑' },
                { id: 'item14', text: '휴대가방(매는거)' },
                { id: 'item15', text: '안경' },
                { id: 'item16', text: '임냄셰' },
                { id: 'item17', text: '인공눈물' },
                { id: 'item18', text: '셀카봉 - 민경이' },
                { id: 'item19', text: '선구리' }
            ]
        },
        {
            title: "화장품",
            items: [
                { id: 'item20', text: '칫솔세트' },
                { id: 'item21', text: '면도기(최근구매)' },
                { id: 'item22', text: '면도크림' },
                { id: 'item23', text: '컨실러' },
                { id: 'item24', text: '로션' },
                { id: 'item25', text: '보습썬크림' },
                { id: 'item26', text: '향수(소분)' },
                { id: 'item27', text: '렌즈 3쌍 / 1쌍(착용)' }
            ]
        },
        {
            title: "의복",
            items: [
                { id: 'item28', text: '검폴로반팔 / 여름청' },
                { id: 'item29', text: '칼하트 / 청반바지' },
                { id: 'item30', text: '하늘색 셔츠 / 브라운반바지' },
                { id: 'item31', text: '잠옷 세트(반팔/강쥐바지)' },
                { id: 'item32', text: '민무늬 이너반팔 2벌' }
            ]
        }
    ];

    // 현재 선택된 사람의 이름 (기본은 진규)
    var currentPerson = "진규";
    
    // 체크리스트 컨테이너
    var container = document.getElementById('checklistContainer');
    if (!container) {
        console.error("체크리스트 컨테이너(div#checklistContainer)를 찾을 수 없습니다.");
        return;
    }
    
    // 사람 선택 드롭다운
    var personSelect = document.getElementById('personSelect');
    if (!personSelect) {
        console.error("사람 선택 드롭다운(select#personSelect)를 찾을 수 없습니다.");
        return;
    }

    // UI 초기화: 현재 선택된 사람의 상태를 불러오고 UI 생성
    loadUI(currentPerson);
    
    // 사람 선택 변경 시 UI 다시 빌드
    personSelect.addEventListener('change', function(event) {
        currentPerson = event.target.value;
        loadUI(currentPerson);
    });
    
    // UI를 불러오는 함수: 쿠키에서 해당 사람의 체크 상태를 불러온 후 UI 빌드
    function loadUI(person) {
        // 쿠키 이름: checklistState_진규 또는 checklistState_민경
        var cookieState = getCookie("checklistState_" + person);
        var checklistState = cookieState ? JSON.parse(cookieState) : {};
        // 컨테이너 초기화
        container.innerHTML = "";
        buildUI(checklistState, person);
    }
    
    // UI 생성 함수 (sections 배열을 이용)
    function buildUI(savedState, person) {
        sections.forEach(function(section) {
            // 섹션 제목 생성
            var header = document.createElement('h2');
            header.className = 'section-header';
            header.textContent = section.title;
            container.appendChild(header);

            // 섹션 항목 목록 생성
            var ul = document.createElement('ul');
            section.items.forEach(function(item) {
                var li = document.createElement('li');
                li.className = 'checklist-item';

                // 체크박스 생성
                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                // 각 항목 아이디는 그대로 사용하되, 체크 상태는 해당 사람의 쿠키 값에서 적용
                checkbox.id = item.id;
                if (savedState[item.id]) {
                    checkbox.checked = true;
                }

                // 레이블 생성
                var label = document.createElement('label');
                label.htmlFor = item.id;
                label.textContent = item.text;
                label.dataset.originalText = item.text;
                if (checkbox.checked) {
                    label.classList.add('checked');
                    label.innerHTML = label.dataset.originalText + " ✅";
                }

                li.appendChild(checkbox);
                li.appendChild(label);
                ul.appendChild(li);
            });
            container.appendChild(ul);
        });
    }
    
    // 체크박스 이벤트 처리: 변경 시 쿠키 업데이트 (선택한 사람의 상태)
    container.addEventListener('change', function(event) {
        if (event.target && event.target.matches('input[type="checkbox"]')) {
            var checkbox = event.target;
            var label = checkbox.nextElementSibling;
            
            // 현재 사람에 대한 쿠키 키
            var cookieKey = "checklistState_" + currentPerson;
            // 기존 쿠키 상태를 가져온 후 업데이트
            var cookieState = getCookie(cookieKey);
            var checklistState = cookieState ? JSON.parse(cookieState) : {};
            checklistState[checkbox.id] = checkbox.checked;
            // 쿠키에 100일간 저장
            setCookie(cookieKey, JSON.stringify(checklistState), 100);
            
            if (checkbox.checked) {
                label.classList.add('checked');
                label.innerHTML = label.dataset.originalText + " ✅";
            } else {
                label.classList.remove('checked');
                label.innerHTML = label.dataset.originalText;
            }
        }
    });
});
