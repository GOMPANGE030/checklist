document.addEventListener('DOMContentLoaded', function() {
    // Firebase 프로젝트 설정 (Firebase 콘솔에서 확인한 값을 입력하세요)
    var firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        databaseURL: "YOUR_DATABASE_URL",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    // Firebase 초기화
    firebase.initializeApp(firebaseConfig);

    // 인증 지속성을 LOCAL로 설정하여, 페이지 새로고침 시에도 동일한 익명 사용자 유지
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function() {
        return firebase.auth().signInAnonymously();
    })
    .then((result) => {
        const uid = result.user.uid;
        // 사용자의 체크리스트 상태를 저장할 경로 설정
        const stateRef = firebase.database().ref('users/' + uid + '/checklistState');
        // 데이터베이스에서 기존 체크 상태 가져오기
        stateRef.once('value').then((snapshot) => {
            var savedState = snapshot.val() || {};
            buildUI(savedState, uid);
        }).catch((err) => {
            console.error(err);
            buildUI({}, uid); // 에러 발생 시 빈 상태로 UI 빌드
        });
    })
    .catch((error) => {
        console.error("인증 설정 또는 익명 인증 실패:", error);
        // 인증 실패 시(또는 네트워크 오류) 빈 상태로 UI 빌드
        buildUI({}, null);
    });

    // 체크리스트 UI 구성 및 이벤트 연결 함수
    function buildUI(savedState, uid) {
        // 섹션 및 항목 배열 (수정 및 추가가 용이함)
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

        var container = document.getElementById('checklistContainer');
        if (!container) {
            console.error("체크리스트 컨테이너(div#checklistContainer)를 찾을 수 없습니다.");
            return;
        }

        // 각 섹션별 UI 생성
        sections.forEach(function(section) {
            // 섹션 제목 생성
            var header = document.createElement('h2');
            header.className = 'section-header';
            header.textContent = section.title;
            container.appendChild(header);

            // 섹션 내부 목록 생성
            var ul = document.createElement('ul');
            section.items.forEach(function(item) {
                var li = document.createElement('li');
                li.className = 'checklist-item';

                // 체크박스 생성 및 저장된 상태 적용
                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
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

        // 이벤트 위임: 체크박스 체크/해제 시 UI 업데이트 및 Firebase에 상태 저장
        container.addEventListener('change', function(event) {
            if (event.target && event.target.matches('input[type="checkbox"]')) {
                var checkbox = event.target;
                var label = checkbox.nextElementSibling;

                // Firebase에 체크 상태 업데이트 (uid가 있을 때만)
                if (uid) {
                    var userStateRef = firebase.database().ref('users/' + uid + '/checklistState/' + checkbox.id);
                    userStateRef.set(checkbox.checked);
                }

                // UI 스타일 업데이트
                if (checkbox.checked) {
                    label.classList.add('checked');
                    label.innerHTML = label.dataset.originalText + " ✅";
                } else {
                    label.classList.remove('checked');
                    label.innerHTML = label.dataset.originalText;
                }
            }
        });
    }
});
