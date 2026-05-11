const fs = require('fs');
const path = require('path');

const langs = [
  { code: 'en-US', file: 'hotel.html', name: 'English' },
  { code: 'zh-CN', file: 'hotel-zh-CN.html', name: '简体中文' },
  { code: 'zh-TW', file: 'hotel-zh-TW.html', name: '繁體中文' },
  { code: 'de-DE', file: 'hotel-de-DE.html', name: 'Deutsch' },
  { code: 'es-ES', file: 'hotel-es-ES.html', name: 'Español' },
  { code: 'fr-FR', file: 'hotel-fr-FR.html', name: 'Français' },
  { code: 'id-ID', file: 'hotel-id-ID.html', name: 'Bahasa Indonesia' },
  { code: 'ja-JP', file: 'hotel-ja-JP.html', name: '日本語' },
  { code: 'ko-KR', file: 'hotel-ko-KR.html', name: '한국어' },
  { code: 'pt-BR', file: 'hotel-pt-BR.html', name: 'Português' },
  { code: 'ru-RU', file: 'hotel-ru-RU.html', name: 'Русский' },
  { code: 'th-TH', file: 'hotel-th-TH.html', name: 'ภาษาไทย' },
  { code: 'vi-VN', file: 'hotel-vi-VN.html', name: 'Tiếng Việt' },
];

const t = {
  'en-US': {
    title: 'Hotel Management System',
    introTitle: 'Local Hotel Management System',
    introDesc: 'Designed for hotel branches, providing a one-stop local solution for room reservations, check-ins, financial management, and permission control.',
    accountTitle: 'Default Accounts & Permissions',
    adminDesc: 'Supreme admin. Highest permissions (menus, departments, permissions).',
    bossDesc: 'Hotel boss. All permissions except adding system menus.',
    managerDesc: 'Hotel manager. All business permissions. Can only add users in their own department.',
    receptionistDesc: 'Front desk. Only check-in and reservation permissions.',
    passwordWarningTitle: '⚠️ Crucial First Login Notice',
    passwordWarningDesc: 'After the first login of admin, immediately change the passwords for all default accounts and securely remember the admin password!',
    privacyTitle: 'Privacy Policy & Disclaimer',
    privacy1Title: 'Local Execution & No Internet Required',
    privacy1Desc: 'This software runs entirely locally. It never collects, uploads, or shares your business data (customer info, orders, financials). Your data is 100% saved on your local hard drive.',
    privacy2Title: 'Data Security & User Responsibility',
    privacy2Desc: 'No cloud sync is provided. You are fully responsible for the security, integrity, and correctness of the data. Please assign employee permissions reasonably to prevent unauthorized access.',
    privacy3Title: 'Data Backup (Critical)',
    privacy3Desc1: 'Regular Backup: Please frequently go to the "Backup & Import" page to back up data.',
    privacy3Desc2: 'Multi-backup: Strong recommendation to save backups to an external USB drive or cloud storage.',
    privacy3Desc3: 'Before System Changes: BEFORE reinstalling your OS, migrating computers, or uninstalling this software, you MUST first backup and export your data.',
    privacy3Desc4: 'Failure to backup will result in permanent loss of historical orders, finance, and customer info.',
    privacy4Title: 'Disclaimer',
    privacy4Desc: 'The developer bears no legal or financial responsibility for data loss due to hardware damage, viruses, ransomware, employee misconduct, forgetting passwords, or failure to perform regular backups as instructed.',
    storeBtn: 'Download from Microsoft Store',
    footer: '© 2026 echoshorts.win. All rights reserved.',
    contact: 'Contact Us',
    hardwareTitle: 'Hardware procurement',
    hardwareDescBefore: 'Door locks, card readers, and key cards. If you need to purchase hardware, please contact ',
    hardwareDescAfter: '.',
    privacyInquiry: 'For privacy-related inquiries, please email supports@echoshorts.win'
  },
  'zh-CN': {
    title: '酒店管理系统',
    introTitle: '本地化酒店管理系统',
    introDesc: '专为酒店门店设计，提供客房预订、入住登记、财务管理及权限控制等一站式本地化解决方案。',
    accountTitle: '默认账号与权限说明',
    adminDesc: '系统超级管理员，拥有最高权限（包括添加菜单、部门管理、权限分配等）。',
    bossDesc: '酒店老板/高管，拥有除“添加菜单”外的所有业务与管理权限。',
    managerDesc: '酒店经理，拥有全部酒店业务管理权限；仅限在自己所在部门下添加/管理用户。',
    receptionistDesc: '酒店前台，仅拥有办理入住和预订功能的权限。',
    passwordWarningTitle: '⚠️ 首次登录极其重要提示',
    passwordWarningDesc: '请在 admin 账号首次登录后，立即修改上述所有默认账号的密码，并务必妥善保管且牢记 admin 的密码！',
    privacyTitle: '隐私政策与免责声明',
    privacy1Title: '纯本地化运行与隐私保护',
    privacy1Desc: '本系统在您的本地设备上运行，完全无需连接互联网即可正常使用系统绝不收集、上传、分析或共享您的任何商业数据。您的所有数据100%保存在本地硬盘中。',
    privacy2Title: '数据安全与用户责任',
    privacy2Desc: '系统不提供云端自动同步功能。用户必须对本软件的数据安全、完整性和正确性负全部责任。请合理分配您的员工系统权限，以免发生越权操作或恶意删改。',
    privacy3Title: '数据备份（极其重要📌）',
    privacy3Desc1: '日常备份：请经常进入“备份与导入页面”进行数据备份。',
    privacy3Desc2: '多重备份：建议将备份文件同时保存到外部硬盘或云盘。',
    privacy3Desc3: '操作前必备份：特别注意！准备重装操作系统或卸载本系统前，必须先完成数据备份。',
    privacy3Desc4: '未备份可能导致历史订单、财务与客户信息永久丢失。',
    privacy4Title: '免责条款',
    privacy4Desc: '开发者对因硬件损坏、电脑病毒、遭遇勒索软件、员工破坏、或未按提示定期备份而导致的数据丢失，不承担任何法律与经济赔偿责任。使用本软件即代表您同意自行承担上述数据安全风险。',
    storeBtn: '从 Microsoft Store 下载',
    footer: '© 2026 echoshorts.win. 保留所有权利.',
    contact: '联系我们',
    hardwareTitle: '硬件设备选购',
    hardwareDescBefore: '门锁、读卡器、门卡等硬件如需采购，请联系 ',
    hardwareDescAfter: '。',
    privacyInquiry: '如需咨询隐私相关问题，请发送邮件至 supports@echoshorts.win'
  },
  'zh-TW': {
    title: '酒店管理系統',
    introTitle: '本地化酒店管理系統',
    introDesc: '專為酒店門店設計，提供客房預訂、入住登記、財務管理及權限控制等一站式本地化解決方案。',
    accountTitle: '默認帳號與權限說明',
    adminDesc: '系統超級管理員，擁有最高權限（包括添加菜單、部門管理、權限分配等）。',
    bossDesc: '酒店老闆/高管，擁有除「添加菜單」外的所有業務與管理權限。',
    managerDesc: '酒店經理，擁有全部酒店業務管理權限；僅限在自己所在部門下添加/管理用戶。',
    receptionistDesc: '酒店前台，僅擁有辦理入住和預訂功能的權限。',
    passwordWarningTitle: '⚠️ 首次登錄極其重要提示',
    passwordWarningDesc: '請在 admin 帳號首次登錄後，立即修改上述所有默認帳號的密碼，並務必妥善保管且牢記 admin 的密碼！',
    privacyTitle: '隱私政策與免責聲明',
    privacy1Title: '純本地化運行與隱私保護',
    privacy1Desc: '本系統在您的本地設備上運行，完全無需連接互聯網。系統絕不收集、上傳、分析或共享您的任何商業數據。您的所有數據100%保存在本地硬盤中。',
    privacy2Title: '數據安全與用戶責任',
    privacy2Desc: '系統不提供雲端自動同步功能。用戶必須對本軟件的數據安全、完整性和正確性負全部責任。請合理分配您的員工系統權限。',
    privacy3Title: '數據備份（極其重要📌）',
    privacy3Desc1: '日常備份：請經常進入「備份與導入頁面」進行數據備份。',
    privacy3Desc2: '多重備份：建議將備份文件同時保存到外部硬盤或雲盤。',
    privacy3Desc3: '操作前必備份：特別注意！準備重裝操作系統或卸載本系統前，必須先完成數據備份。',
    privacy3Desc4: '未備份可能導致歷史訂單、財務與客戶信息永久丟失。',
    privacy4Title: '免責條款',
    privacy4Desc: '開發者對因硬件損壞、電腦病毒、遭遇勒索軟件、員工破壞、或未按提示定期備份而導致的數據丟失，不承擔任何法律與經濟賠償責任。',
    storeBtn: '從 Microsoft Store 下載',
    footer: '© 2026 echoshorts.win. 保留所有權利.',
    contact: '聯繫我們',
    hardwareTitle: '硬體設備選購',
    hardwareDescBefore: '門鎖、讀卡器、門卡等硬體如需採購，請聯絡 ',
    hardwareDescAfter: '。',
    privacyInquiry: '如需諮詢隱私相關問題，請發送郵件至 supports@echoshorts.win'
  },
  'ja-JP': {
    title: 'ホテル管理システム',
    introTitle: 'ローカルホテル管理システム',
    introDesc: 'ホテル店舗向けに設計され、客室予約、チェックイン、財務管理、権限管理などのローカルソリューションを提供します。',
    accountTitle: 'デフォルトアカウントと権限',
    adminDesc: 'スーパー管理者。最高の権限（メニュー追加、部門管理、権限割り当てなど）。',
    bossDesc: 'ホテルオーナー。システムメニュー追加を除くすべての権限。',
    managerDesc: 'ホテルマネージャー。すべての業務権限。自分の部門下でのみユーザー追加可能。',
    receptionistDesc: 'フロントデスク。チェックインと予約の権限のみ。',
    passwordWarningTitle: '⚠️ 初回ログイン時の重要なお知らせ',
    passwordWarningDesc: 'adminの初回ログイン後、直ちにすべてのアカウントのパスワードを変更し、adminのパスワードを安全に保管してください！',
    privacyTitle: 'プライバシーポリシーと免責事項',
    privacy1Title: 'ローカル実行とインターネット不要',
    privacy1Desc: 'このソフトウェアは完全にローカルで実行されます。業務データ（顧客情報、注文、財務）を収集、アップロード、共有することはありません。データは100％ローカルハードドライブに保存されます。',
    privacy2Title: 'データセキュリティとユーザーの責任',
    privacy2Desc: 'クラウド同期機能は提供されません。データの安全性、完全性、正確性に対する全責任はユーザーにあります。不正アクセスを防ぐため、従業員の権限を適切に割り当ててください。',
    privacy3Title: 'データバックアップ（重要）',
    privacy3Desc1: '定期的なバックアップ：頻繁に「バックアップとインポート」ページでデータをバックアップしてください。',
    privacy3Desc2: '複数バックアップ：外部USBドライブやクラウドストレージへのバックアップ保存を強く推奨します。',
    privacy3Desc3: 'システム変更前：OSの再インストール、PCの移行、本ソフトウェアのアンインストールを行う前に、必ずデータのバックアップとエクスポートを行ってください。',
    privacy3Desc4: 'バックアップを怠ると、履歴の注文、財務、顧客情報が完全に失われます。',
    privacy4Title: '免責事項',
    privacy4Desc: 'ハードウェアの損傷、ウイルス、ランサムウェア、従業員の不正行為、パスワードの忘却、または定期的なバックアップを怠ったことによるデータ損失について、開発者は法的または経済的な責任を負いません。',
    storeBtn: 'Microsoft Store からダウンロード',
    footer: '© 2026 echoshorts.win. 全著作権所有.',
    contact: 'お問い合わせ',
    hardwareTitle: 'ハードウェアの調達',
    hardwareDescBefore: 'ドアロック、カードリーダー、キーカードなど。ご購入のご相談は ',
    hardwareDescAfter: ' までご連絡ください。',
    privacyInquiry: 'プライバシーに関するお問い合わせは supports@echoshorts.win までメールでご連絡ください。'
  },
  'ko-KR': {
    title: '호텔 관리 시스템',
    introTitle: '로컬 호텔 관리 시스템',
    introDesc: '호텔 지점을 위해 설계되었으며 객실 예약, 체크인, 재무 관리 및 권한 제어를 위한 로컬 솔루션을 제공합니다.',
    accountTitle: '기본 계정 및 권한',
    adminDesc: '최고 관리자. 최고 권한(메뉴 추가, 부서 관리, 권한 할당 등).',
    bossDesc: '호텔 소유자. 메뉴 추가를 제외한 모든 권한.',
    managerDesc: '호텔 매니저. 모든 업무 권한. 자신의 부서 내에서만 사용자 추가 가능.',
    receptionistDesc: '프론트 데스크. 체크인 및 예약 권한만 있음.',
    passwordWarningTitle: '⚠️ 첫 로그인 시 중요 공지',
    passwordWarningDesc: 'admin 첫 로그인 후 즉시 모든 기본 계정의 비밀번호를 변경하고 admin 비밀번호를 안전하게 기억하세요!',
    privacyTitle: '개인정보 보호정책 및 면책 조항',
    privacy1Title: '로컬 실행 및 인터넷 불필요',
    privacy1Desc: '이 소프트웨어는 완전히 로컬에서 실행됩니다. 귀하의 비즈니스 데이터(고객 정보, 주문, 재무)를 절대로 수집, 업로드 또는 공유하지 않습니다. 귀하의 데이터는 100% 로컬 하드 드라이브에 저장됩니다.',
    privacy2Title: '데이터 보안 및 사용자 책임',
    privacy2Desc: '클라우드 동기화는 제공되지 않습니다. 귀하는 데이터의 보안, 무결성 및 정확성에 대한 전적인 책임이 있습니다. 권한 없는 접근을 방지하기 위해 직원 권한을 합리적으로 할당하십시오.',
    privacy3Title: '데이터 백업 (중요)',
    privacy3Desc1: '정기 백업: "백업 및 가져오기" 페이지로 자주 이동하여 데이터를 백업하십시오.',
    privacy3Desc2: '다중 백업: 백업을 외부 USB 드라이브나 클라우드 스토리지에 저장하는 것을 강력히 권장합니다.',
    privacy3Desc3: '시스템 변경 전: OS 재설치, 컴퓨터 마이그레이션 또는 이 소프트웨어의 제거를 수행하기 전에 반드시 데이터를 백업하고 내보내야 합니다.',
    privacy3Desc4: '백업을 하지 않으면 이전 주문, 재무 및 고객 정보가 영구적으로 손실될 수 있습니다.',
    privacy4Title: '면책 조항',
    privacy4Desc: '개발자는 하드웨어 손상, 바이러스, 랜섬웨어, 직원의 부당 행위, 비밀번호 분실 또는 지시된 정기 백업을 수행하지 않음으로 인한 데이터 손실에 대해 어떠한 법적 및 재정적 책임도 지지 않습니다.',
    storeBtn: 'Microsoft Store에서 다운로드',
    footer: '© 2026 echoshorts.win. 판권 소유.',
    contact: '문의하기',
    hardwareTitle: '하드웨어 구매',
    hardwareDescBefore: '도어락, 카드 리더기, 키 카드 등 구매가 필요하시면 ',
    hardwareDescAfter: ' 로 문의해 주세요.',
    privacyInquiry: '개인정보 관련 문의는 supports@echoshorts.win 로 이메일 주세요.'
  },
  'pt-BR': {
    title: 'Sistema de Gestão Hoteleira',
    introTitle: 'Sistema de Gestão Hoteleira Local',
    introDesc: 'Projetado para filiais de hotéis, fornecendo uma solução local completa para reservas de quartos, check-ins, gestão financeira e controle de permissões.',
    accountTitle: 'Contas Padrão e Permissões',
    adminDesc: 'Administrador supremo. Permissões mais altas (menus, departamentos, permissões).',
    bossDesc: 'Dono do hotel. Todas as permissões, exceto adicionar menus do sistema.',
    managerDesc: 'Gerente do hotel. Todas as permissões de negócios. Só pode adicionar usuários em seu próprio departamento.',
    receptionistDesc: 'Recepção. Apenas permissões de check-in e reserva.',
    passwordWarningTitle: '⚠️ Aviso Crucial no Primeiro Login',
    passwordWarningDesc: 'Após o primeiro login do admin, altere imediatamente as senhas de todas as contas padrão e memorize com segurança a senha do admin!',
    privacyTitle: 'Política de Privacidade e Isenção de Responsabilidade',
    privacy1Title: 'Execução Local e Sem Necessidade de Internet',
    privacy1Desc: 'Este software roda inteiramente localmente. Nunca coleta, faz upload ou compartilha os dados da sua empresa. Seus dados são salvos 100% no seu disco rígido local.',
    privacy2Title: 'Segurança de Dados e Responsabilidade do Usuário',
    privacy2Desc: 'Nenhuma sincronização na nuvem é fornecida. Você é totalmente responsável pela segurança, integridade e exatidão dos dados. Aloque as permissões dos funcionários razoavelmente.',
    privacy3Title: 'Backup de Dados (Crítico)',
    privacy3Desc1: 'Backup Regular: Acesse frequentemente a página "Backup e Importação" para fazer backup.',
    privacy3Desc2: 'Multi-backup: Forte recomendação para salvar backups em uma unidade USB externa ou armazenamento em nuvem.',
    privacy3Desc3: 'Antes de Mudanças no Sistema: ANTES de reinstalar o SO, migrar computadores ou desinstalar este software, você DEVE fazer backup.',
    privacy3Desc4: 'A falha em fazer backup resultará na perda permanente de pedidos históricos, finanças e informações de clientes.',
    privacy4Title: 'Isenção de Responsabilidade',
    privacy4Desc: 'O desenvolvedor não assume responsabilidade legal ou financeira por perda de dados devido a danos de hardware, vírus, ransomware, má conduta de funcionários ou falha em realizar backups regulares.',
    storeBtn: 'Baixar da Microsoft Store',
    footer: '© 2026 echoshorts.win. Todos os direitos reservados.',
    contact: 'Contate-nos',
    hardwareTitle: 'Aquisição de hardware',
    hardwareDescBefore: 'Fechaduras, leitores de cartão e cartões. Para compras, entre em contato com ',
    hardwareDescAfter: '.',
    privacyInquiry: 'Para dúvidas sobre privacidade, envie e-mail para supports@echoshorts.win'
  },
  'ru-RU': {
    title: 'Система Управления Отелем',
    introTitle: 'Локальная Система Управления Отелем',
    introDesc: 'Разработана для филиалов отелей, обеспечивая комплексное локальное решение для бронирования номеров, регистрации, финансового управления и контроля прав доступа.',
    accountTitle: 'Стандартные Аккаунты и Права Доступа',
    adminDesc: 'Главный администратор. Высшие права доступа (меню, отделы, права).',
    bossDesc: 'Владелец отеля. Все права, кроме добавления системных меню.',
    managerDesc: 'Менеджер отеля. Все деловые права. Может добавлять пользователей только в свой отдел.',
    receptionistDesc: 'Стойка регистрации. Только права на регистрацию и бронирование.',
    passwordWarningTitle: '⚠️ Важное уведомление при первом входе',
    passwordWarningDesc: 'После первого входа admin немедленно измените пароли для всех стандартных аккаунтов и надежно запомните пароль admin!',
    privacyTitle: 'Политика Конфиденциальности и Отказ от Ответственности',
    privacy1Title: 'Локальное Исполнение и Отсутствие Интернета',
    privacy1Desc: 'Это программное обеспечение работает полностью локально. Оно никогда не собирает, не загружает и не передает ваши бизнес-данные. Ваши данные 100% хранятся на локальном жестком диске.',
    privacy2Title: 'Безопасность Данных и Ответственность Пользователя',
    privacy2Desc: 'Облачная синхронизация не предусмотрена. Вы несете полную ответственность за безопасность, целостность и правильность данных.',
    privacy3Title: 'Резервное Копирование Данных (Критически)',
    privacy3Desc1: 'Регулярное Копирование: Часто заходите на страницу "Резервное копирование и импорт" для создания резервных копий.',
    privacy3Desc2: 'Множественное Копирование: Настоятельно рекомендуется сохранять резервные копии на внешний USB-накопитель или в облако.',
    privacy3Desc3: 'Перед Изменениями Системы: ПЕРЕД переустановкой ОС, переносом компьютеров или удалением этого ПО вы ДОЛЖНЫ сделать резервную копию.',
    privacy3Desc4: 'Отсутствие резервной копии приведет к безвозвратной потере исторических заказов, финансов и информации о клиентах.',
    privacy4Title: 'Отказ от Ответственности',
    privacy4Desc: 'Разработчик не несет юридической или финансовой ответственности за потерю данных из-за повреждения оборудования, вирусов, программ-вымогателей или отсутствия регулярного резервного копирования.',
    storeBtn: 'Скачать из Microsoft Store',
    footer: '© 2026 echoshorts.win. Все права защищены.',
    contact: 'Связаться с нами',
    hardwareTitle: 'Закупка оборудования',
    hardwareDescBefore: 'Замки, считыватели карт и карты доступа. По вопросам закупки пишите на ',
    hardwareDescAfter: '.',
    privacyInquiry: 'По вопросам конфиденциальности пишите на supports@echoshorts.win'
  },
  'es-ES': {
    title: 'Sistema de Gestión Hotelera',
    introTitle: 'Sistema de Gestión Hotelera Local',
    introDesc: 'Diseñado para sucursales de hoteles, brindando una solución local integral para reservas, check-ins, gestión financiera y control de permisos.',
    accountTitle: 'Cuentas y Permisos Predeterminados',
    adminDesc: 'Administrador supremo. Permisos más altos (menús, departamentos, permisos).',
    bossDesc: 'Dueño del hotel. Todos los permisos excepto agregar menús.',
    managerDesc: 'Gerente del hotel. Todos los permisos comerciales. Solo puede agregar usuarios en su propio departamento.',
    receptionistDesc: 'Recepción. Solo permisos de reserva y check-in.',
    passwordWarningTitle: '⚠️ Aviso Crucial del Primer Inicio de Sesión',
    passwordWarningDesc: '¡Después del primer inicio de sesión del administrador, cambie inmediatamente todas las contraseñas predeterminadas y recuerde la contraseña de admin de manera segura!',
    privacyTitle: 'Política de Privacidad y Descargo de Responsabilidad',
    privacy1Title: 'Ejecución Local y Sin Internet',
    privacy1Desc: 'Este software funciona completamente local. Nunca recopila, carga o comparte los datos de su empresa. Sus datos se guardan 100% en su disco local.',
    privacy2Title: 'Seguridad de Datos y Responsabilidad del Usuario',
    privacy2Desc: 'No se proporciona sincronización en la nube. Usted es totalmente responsable de la seguridad de sus datos.',
    privacy3Title: 'Copia de Seguridad (Crítico)',
    privacy3Desc1: 'Copia de Seguridad Regular: Vaya a la página de Copia de Seguridad para respaldar sus datos.',
    privacy3Desc2: 'Respaldo Opcional: Recomendamos guardar copias en USB o en la nube.',
    privacy3Desc3: 'Antes de Cambios del Sistema: ANTES de reinstalar el sistema operativo o migrar de PC debe hacer una copia de seguridad.',
    privacy3Desc4: 'La falta de copia de seguridad puede causar pérdida de datos permanentemente.',
    privacy4Title: 'Descargo de Responsabilidad',
    privacy4Desc: 'El desarrollador no se hace responsable de las pérdidas de información en caso de fallo del hardware, ransomware o falta de una copia de seguridad regular.',
    storeBtn: 'Descargar de Microsoft Store',
    footer: '© 2026 echoshorts.win. Todos los derechos reservados.',
    contact: 'Contáctenos',
    hardwareTitle: 'Adquisición de hardware',
    hardwareDescBefore: 'Cerraduras, lectores de tarjetas y tarjetas de acceso. Para compras, contacte a ',
    hardwareDescAfter: '.',
    privacyInquiry: 'Para consultas sobre privacidad, escriba a supports@echoshorts.win'
  },
  'fr-FR': {
    title: 'Système de Gestion Hôtelière',
    introTitle: 'Système de Gestion Hôtelière Local',
    introDesc: 'Conçu pour les hôtels, fournissant une solution locale complète pour les réservations, enregistrements, la gestion financière et le contrôle d\'accès.',
    accountTitle: 'Comptes et Permissions par Défaut',
    adminDesc: 'Administrateur suprême. Droits les plus élevés (menus, départements, permissions).',
    bossDesc: 'Propriétaire de l\'hôtel. Tous les droits sauf l\'ajout de menus.',
    managerDesc: 'Gérant de l\'hôtel. Tous les droits commerciaux. Ne peut ajouter des utilisateurs que dans son département.',
    receptionistDesc: 'Réception. Seulement des droits de réservation et d\'enregistrement.',
    passwordWarningTitle: '⚠️ Avis Crucial après la Première Connexion',
    passwordWarningDesc: 'Après la première connexion de l\'admin, modifiez immédiatement tous les mots de passe par défaut et mémorisez bien le mot de passe admin !',
    privacyTitle: 'Politique de Confidentialité et Avertissement',
    privacy1Title: 'Exécution Locale, Aucun Internet Requis',
    privacy1Desc: 'Ce logiciel fonctionne entièrement localement. Il ne télécharge ni ne partage jamais vos données commerciales.',
    privacy2Title: 'Sécurité des Données et Responsabilité de l\'Utilisateur',
    privacy2Desc: 'Aucune synchronisation cloud n\'est fournie. Vous êtes entièrement responsable de la sécurité, de l\'intégrité et de l\'exactitude des données.',
    privacy3Title: 'Sauvegarde des Données (Critique)',
    privacy3Desc1: 'Sauvegarde Régulière: Allez souvent à la page "Sauvegarde et Importation" pour sauvegarder les données.',
    privacy3Desc2: 'Multi-sauvegardes: Il est vivement recommandé d\'enregistrer les sauvegardes sur une clé USB ou le cloud.',
    privacy3Desc3: 'Avant Changements de Système: AVANT de réinstaller l\'OS ou de migrer des ordinateurs, vous DEVEZ faire une sauvegarde.',
    privacy3Desc4: 'Ne pas faire de sauvegarde entraînera une perte permanente des dossiers ou autres informations des clients.',
    privacy4Title: 'Avertissement',
    privacy4Desc: 'Le développeur décline toute responsabilité pour toute perte de données due à des pannes, virus, rançongiciels, ou le non-respect des sauvegardes régulières.',
    storeBtn: 'Télécharger depuis le Microsoft Store',
    footer: '© 2026 echoshorts.win. Tous droits réservés.',
    contact: 'Nous Contacter',
    hardwareTitle: 'Achat de matériel',
    hardwareDescBefore: 'Serrures, lecteurs de cartes et cartes d\'accès. Pour les achats, contactez ',
    hardwareDescAfter: '.',
    privacyInquiry: 'Pour toute question relative à la confidentialité, écrivez à supports@echoshorts.win'
  },
  'de-DE': {
    title: 'Hotel Management System',
    introTitle: 'Lokales Hotel Management System',
    introDesc: 'Entwickelt für Hotelzweigstellen, bietet es eine lokale All-in-One-Lösung für Reservierungen, Check-ins, Finanzmanagement und die Berechtigungssteuerung.',
    accountTitle: 'Standardkonten und Berechtigungen',
    adminDesc: 'Super-Administrator. Höchste Berechtigungen (Menüs, Abteilungen, Berechtigungen).',
    bossDesc: 'Hotelbesitzer. Alle Berechtigungen außer das Hinzufügen von Menüs.',
    managerDesc: 'Hotelmanager. Alle Geschäftsberechtigungen. Kann nur Benutzer in der eigenen Abteilung hinzufügen.',
    receptionistDesc: 'Rezeption. Nur Berechtigungen für Check-in und Reservierung.',
    passwordWarningTitle: '⚠️ Wichtiger Hinweis beim Ersteinloggen',
    passwordWarningDesc: 'Ändern Sie nach dem ersten Login des Admins sofort die Passwörter aller Konten und merken Sie sich das Admin-Passwort!',
    privacyTitle: 'Datenschutzerklärung & Haftungsausschluss',
    privacy1Title: 'Lokale Ausführung, ohne Internet',
    privacy1Desc: 'Diese Software wird komplett lokal ausgeführt. Betriebsdaten werden nicht gesammelt, hochgeladen oder geteilt.',
    privacy2Title: 'Datensicherheit und Nutzerverantwortung',
    privacy2Desc: 'Es wird keine Cloud-Synchronisierung angeboten. Sie sind für die Datensicherheit voll verantwortlich.',
    privacy3Title: 'Datensicherung (Kritisch)',
    privacy3Desc1: 'Regelmäßige Sicherung: Besuchen Sie häufig die Seite "Sichern & Importieren", um Daten zu sichern.',
    privacy3Desc2: 'Multi-Sicherung: Empfehlenswert ist das Speichern der Backups auf USB oder in der Cloud.',
    privacy3Desc3: 'Vor Systemänderungen: BEVOR das OS neu installiert oder Computer migriert werden, MÜSSEN Sie Daten sichern.',
    privacy3Desc4: 'Verpasste Sicherung kann zum Datenverlust der Bestellhistorie, Finanzen und Kundeninformationen führen.',
    privacy4Title: 'Haftungsausschluss',
    privacy4Desc: 'Der Entwickler haftet rechtlich oder finanziell nicht für Datenverlust durch Hardwarefehler, Viren, Ransomware, oder bei fehlender regelmäßiger Sicherung.',
    storeBtn: 'Aus dem Microsoft Store herunterladen',
    footer: '© 2026 echoshorts.win. Alle Rechte vorbehalten.',
    contact: 'Kontaktiere Uns',
    hardwareTitle: 'Hardware-Beschaffung',
    hardwareDescBefore: 'Türschlösser, Kartenleser und Hotelkarten. Bei Bedarf an Beschaffung wenden Sie sich bitte an ',
    hardwareDescAfter: '.',
    privacyInquiry: 'Bei Fragen zum Datenschutz senden Sie bitte eine E-Mail an supports@echoshorts.win'
  },
  'id-ID': {
    title: 'Sistem Manajemen Hotel',
    introTitle: 'Sistem Manajemen Hotel Lokal',
    introDesc: 'Dirancang untuk cabang hotel, menyediakan solusi lokal terpadu untuk reservasi kamar, pendaftaran masuk, manajemen keuangan, dan kontrol izin.',
    accountTitle: 'Akun Standar & Izin',
    adminDesc: 'Administrator super. Izin tertinggi (menu, departemen, izin).',
    bossDesc: 'Pemilik hotel. Semua izin kecuali menambahkan menu sistem.',
    managerDesc: 'Manajer hotel. Semua izin operasi. Hanya bisa menambah pengguna di departemennya.',
    receptionistDesc: 'Resepsionis. Hanya izin masuk kamar dan pemesanan.',
    passwordWarningTitle: '⚠️ Catatan Penting Saat Login Pertama',
    passwordWarningDesc: 'Setelah login admin pertama, segera ubah sandi untuk semua akun standar dan ingat sandi admin dengan aman!',
    privacyTitle: 'Kebijakan Privasi & Penolakan',
    privacy1Title: 'Eksekusi Lokal, Tanpa Internet',
    privacy1Desc: 'Perangkat lunak ini berjalan sepenuhnya lokal. Ia tidak pernah mengumpulkan, atau membagikan data bisnis Anda.',
    privacy2Title: 'Keamanan Data dan Tanggung Jawab Pengguna',
    privacy2Desc: 'Tidak ada sinkronisasi cloud yang diberikan. Anda sepenuhnya bertanggung jawab atas keamanan data.',
    privacy3Title: 'Cadangan Data (Penting)',
    privacy3Desc1: 'Cadangan Rutin: Sering pergi ke halaman "Cadangkan dan Impor" untuk mencadangkan data.',
    privacy3Desc2: 'Multi-cadangan: Rekomendasi untuk menyimpan cadangan ke drive USB eksternal atau cloud.',
    privacy3Desc3: 'Sebelum Perubahan Sistem: SEBELUM menginstal ulang OS atau mencadangkan, Anda HARUS mencadangkan dan mengekspor data.',
    privacy3Desc4: 'Kegagalan mencadangkan mengakibatkan kehilangan informasi pelanggan dan log keuangan secara permanen.',
    privacy4Title: 'Penafian',
    privacy4Desc: 'Pengembang tidak menanggung tanggung jawab hukum maupun keuangan untuk kerusakan perangkat keras, virus, ransomware, atau kegagalan untuk melakukan cadangan rutin.',
    storeBtn: 'Unduh dari Microsoft Store',
    footer: '© 2026 echoshorts.win. Hak Cipta Dilindungi Undang-undang.',
    contact: 'Hubungi Kami',
    hardwareTitle: 'Pengadaan perangkat keras',
    hardwareDescBefore: 'Kunci pintu, pembaca kartu, dan kartu akses. Untuk pembelian hubungi ',
    hardwareDescAfter: '.',
    privacyInquiry: 'Untuk pertanyaan privasi, email supports@echoshorts.win'
  },
  'vi-VN': {
    title: 'Hệ thống Quản lý Khách sạn',
    introTitle: 'Hệ thống Quản lý Khách sạn Nội bộ',
    introDesc: 'Được thiết kế cho các chi nhánh khách sạn, cung cấp giải pháp cục bộ toàn diện.',
    accountTitle: 'Tài khoản & Quyền Mặc định',
    adminDesc: 'Quản trị viên tối cao. Quyền cao nhất (thực đơn, phòng ban, quyền).',
    bossDesc: 'Chủ khách sạn. Tất cả các quyền ngoại trừ thêm menu.',
    managerDesc: 'Quản lý khách sạn. Tất cả quyền kinh doanh. Chỉ có thể thêm người dùng trong phòng ban riêng.',
    receptionistDesc: 'Lễ tân. Chỉ có quyền nhận phòng và đặt trước.',
    passwordWarningTitle: '⚠️ Thông báo Quan trọng cho Lần Đăng nhập Đầu',
    passwordWarningDesc: 'Sau lần đăng nhập đầu tiên của quản trị viên, ngay lập tức thay đổi mật khẩu của tất cả các tài khoản mặc định và ghi nhớ mật khẩu quản trị viên an toàn!',
    privacyTitle: 'Chính sách Bảo mật và Tuyên bố từ chối trách nhiệm',
    privacy1Title: 'Thi hành Cục bộ & Không Cần Internet',
    privacy1Desc: 'Phần mềm này hoạt động hoàn toàn cục bộ. Không bao giờ thu thập, tải lên, chia sẻ dữ liệu kinh doanh.',
    privacy2Title: 'An ninh Dữ liệu & Trách nhiệm Của Người Dùng',
    privacy2Desc: 'Không có đồng bộ điện toán đám mây. Bạn chịu toàn bộ trách nhiệm về sự an toàn và toàn vẹn của dữ liệu.',
    privacy3Title: 'Sao lưu Dữ liệu (Rất Quan trọng)',
    privacy3Desc1: 'Sao lưu Định kỳ: Thường xuyên truy cập "Sao lưu & Nhập khẩu" để sao lưu.',
    privacy3Desc2: 'Sao lưu Đa chiều: Khuyến khích mạnh mẽ lưu vào USB bên ngoài hoặc Đám mây.',
    privacy3Desc3: 'Trước Khi Thay đổi Hệ thống: TRƯỚC KHI Cài đặt lại Hệ điều hành, hay gỡ cài đặt phần mềm này, BẠN PHẢI SAO LƯU DỮ LIỆU.',
    privacy3Desc4: 'Việc không sao lưu khiến mất vĩnh viễn các lịch sử tài chính, đơn hàng.',
    privacy4Title: 'Tuyên bố Khước từ',
    privacy4Desc: 'Nhà phát triển từ chối quyền pháp lý/tài chính cho tổn thất dữ liệu do hỏng phần cứng, phần mềm độc hại, vi rút, hoặc không thực hiện sao lưu định kỳ.',
    storeBtn: 'Tải xuống từ Microsoft Store',
    footer: '© 2026 echoshorts.win. Mọi quyền được bảo lưu.',
    contact: 'Liên hệ Chúng tôi',
    hardwareTitle: 'Mua sắm thiết bị phần cứng',
    hardwareDescBefore: 'Khóa cửa, đầu đọc thẻ và thẻ từ. Cần mua hàng vui lòng liên hệ ',
    hardwareDescAfter: '.',
    privacyInquiry: 'Thắc mắc về quyền riêng tư, vui lòng gửi email tới supports@echoshorts.win'
  },
  'th-TH': {
    title: 'ระบบการจัดการโรงแรม',
    introTitle: 'ระบบการจัดการโรงแรมท้องถิ่น',
    introDesc: 'ออกแบบมาสำหรับสาขาของโรงแรม เพื่อจัดการการจองห้องพัก การเช็คอิน การเงิน และการจัดสรรสิทธิ์ผู้ใช้ในรูปแบบออฟไลน์ทั้งหมด',
    accountTitle: 'บัญชีและการให้สิทธิ์พื้นฐาน',
    adminDesc: 'ผู้ดูแลระบบสูงสุด มีสิทธิ์สูงสุดในการเข้าถึงระบบ.',
    bossDesc: 'เจ้าของโรงแรม มีสิทธิ์ทั้งหมด ยกเว้นเพิ่มเมนูระบบ.',
    managerDesc: 'ผู้จัดการโรงแรม มีสิทธิ์จัดการธุรกรรม แต่จัดการได้แค่แผนกของตัวเอง',
    receptionistDesc: 'แผนกต้อนรับ มีสิทธิ์เฉพาะการจองและเช็คอิน',
    passwordWarningTitle: '⚠️ โปรดทราบเมื่อล็อกอินครั้งแรก',
    passwordWarningDesc: 'หลังจากผู้ดูแลระบบเข้าสู่ระบบครั้งแรก กรุณาเปลี่ยนรหัสผ่านเพื่อความปลอดภัย.',
    privacyTitle: 'นโยบายความเป็นส่วนตัวและข้อสงวนสิทธิ์',
    privacy1Title: 'การประมวลผลโลคัล ไม่ใช้อินเทอร์เน็ต',
    privacy1Desc: 'ระบบนี้ทำงานแบบโลคัล ไม่มีการเก็บหรือส่งข้อมูลธุรกิจของคุณ',
    privacy2Title: 'ความปลอดภัยข้อมูลและความรับผิดชอบ',
    privacy2Desc: 'ระบบนี้ไม่มีการเชื่อมต่อกับคลาวด์ ผู้ใช้จะต้องรับผิดชอบต่อความถูกต้องและความปลอดภัยของข้อมูล',
    privacy3Title: 'การสำรองข้อมูล (สำคัญมาก)',
    privacy3Desc1: 'สำรองข้อมูลบ่อย: โปรดใช้ฟังก์ชัน "การสำรองและนำเข้าข้อมูล" อยู่เสมอ',
    privacy3Desc2: 'การสำรองข้อมูลเพิ่มเติม: ควรคัดลอกไฟล์ไปยังไดรฟ์ USB หรือระบบคลาวด์',
    privacy3Desc3: 'ก่อนเปลี่ยนแปลงระบบ: โปรดจัดการสำรองข้อมูลก่อนเริ่มติดตั้งระบบปฏิบัติการใหม่',
    privacy3Desc4: 'ในกรณีที่ไม่สำรองข้อมูล ข้อมูลรายการทางการเงินและลูกค้าอาจสูญหาย',
    privacy4Title: 'ข้อสงวนสิทธิ์',
    privacy4Desc: 'ผลเสียหายสำหรับข้อผิดพลาดของข้อมูลอันเนื่องมาจากปัญหาด้านฮาร์ดแวร์ ไวรัส ซอฟต์แวร์ประสงค์ร้าย หรือการละเว้นสำรองข้อมูล ผู้พัฒนาจะไม่รับผิดในกรณีข้างต้น',
    storeBtn: 'ดาวน์โหลดจาก Microsoft Store',
    footer: '© 2026 echoshorts.win สงวนลิขสิทธิ์ทั้งหมด',
    contact: 'ติดต่อเรา',
    hardwareTitle: 'การจัดซื้ออุปกรณ์ฮาร์ดแวร์',
    hardwareDescBefore: 'ล็อกประตู เครื่องอ่านบัตร และบัตรผ่านประตู หากต้องการจัดซื้อ ติดต่อ ',
    hardwareDescAfter: '',
    privacyInquiry: 'หากมีข้อซักถามด้านความเป็นส่วนตัว อีเมล supports@echoshorts.win'
  }
};

const makeOptions = (lang) => {
  return langs.map(l => {
    return `<option value="${l.file}"${l.code === lang ? ' selected' : ''}>${l.name}</option>`;
  }).join('\\n      ');
};

const template = (lang, text) => {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${text.title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f0f0f; color: #e0e0e0; min-height: 100vh; display: flex; flex-direction: column; }
    main { flex: 1; max-width: 860px; margin: 0 auto; padding: 60px 40px 40px; width: 100%; }
    .intro { margin-bottom: 48px; }
    .intro .logo { font-size: 13px; font-weight: 700; color: #4ade80; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 20px; }
    .intro h1 { font-size: 38px; font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 16px; }
    .intro h1 span { color: #4ade80; }
    .intro p { font-size: 15px; color: #999; line-height: 1.7; max-width: 580px; }

    .features { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 40px; }
    .card { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 12px; padding: 22px; }
    .card .icon { font-size: 22px; margin-bottom: 10px; }
    .card h3 { font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 6px; }
    .card p { font-size: 13px; color: #777; line-height: 1.6; }

    .hint { background: #3a1a1a; border: 1px solid #5a2a2a; border-radius: 10px; padding: 16px 20px; display: flex; align-items: flex-start; gap: 14px; margin-bottom: 48px; }
    .hint h4 { font-size: 14px; color: #ff6b6b; margin-bottom: 4px; }
    .hint p { font-size: 13px; color: #ccc;line-height:1.6; }

    .privacy { background: #141414; border: 1px solid #222; border-radius: 14px; padding: 32px 36px; margin-bottom: 40px; }
    .privacy h2 { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 24px; padding-bottom: 14px; border-bottom: 1px solid #222; }
    .section { margin-bottom: 22px; }
    .section:last-child { margin-bottom: 0; }
    .section h3 { font-size: 12px; font-weight: 600; color: #4ade80; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 7px; }
    .section p { font-size: 13px; color: #888; line-height: 1.75; }
    .section p { margin-top: 6px; }
    .section ul { padding-left: 20px; margin-top: 6px; font-size: 13px; color: #888; line-height: 1.75;}
    .section li { margin-bottom: 4px; }
    .section a { color: #4ade80; text-decoration: none; }
    .section a:hover { text-decoration: underline; }

    footer { text-align: center; padding: 20px 40px; border-top: 1px solid #1a1a1a; display: flex; justify-content: center; align-items: center; gap: 28px; }
    footer span { font-size: 12px; color: #444; }
    footer a { font-size: 12px; color: #666; text-decoration: none; }
    footer a:hover { color: #4ade80; }
    
    .lang-switcher { width: 100%; max-width: 860px; margin: 0 auto; padding: 20px 40px 0; display: flex; justify-content: flex-end; }
    .lang-switcher select { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 6px; color: #e0e0e0; font-size: 12px; padding: 5px 8px; cursor: pointer; outline: none; }
    .lang-switcher select:hover { border-color: #4ade80; }
    .btn-row { display: flex; gap: 10px; margin: 14px 0; flex-wrap: wrap; }
    .btn { display: inline-block; padding: 9px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; text-decoration: none !important; transition: opacity .15s; }
    .btn:hover { opacity: 0.85; }
    .btn-green { background: #4ade80; color: #0f0f0f; }
  </style>
</head>
<body>
  <script src="lang-query.js"></script>
  <script src="index-back-nav.js"></script>
  <div class="lang-switcher">
    <select onchange="location.href=this.value">
      ${makeOptions(lang)}
    </select>
  </div>

  <main>
    <div class="intro">
      <div class="logo">${text.title}</div>
      <h1>${text.introTitle.replace(' ', '<br><span>').replace(/酒店/g,'<span>酒店').replace(/Hotel/g,'<span>Hotel')}</span></h1>
      <p>${text.introDesc}</p>
    </div>

    <div class="btn-row" style="margin-bottom: 30px;">
      <a class="btn btn-green" href="ms-windows-store://pdp/?productid=9NPRXW5R23HC">${text.storeBtn}</a>
    </div>

    <h2 style="font-size: 15px; margin-bottom:20px;border-bottom: 1px solid #222;padding-bottom:14px;">${text.accountTitle}</h2>
    <div class="features">
      <div class="card">
        <h3>admin (123456)</h3>
        <p>${text.adminDesc}</p>
      </div>
      <div class="card">
        <h3>boss (123456)</h3>
        <p>${text.bossDesc}</p>
      </div>
      <div class="card">
        <h3>manager (123456)</h3>
        <p>${text.managerDesc}</p>
      </div>
      <div class="card">
        <h3>receptionist (123456)</h3>
        <p>${text.receptionistDesc}</p>
      </div>
    </div>

    <div class="hint">
      <div>
        <h4>${text.passwordWarningTitle}</h4>
        <p>${text.passwordWarningDesc}</p>
      </div>
    </div>

    <div class="privacy" style="margin-bottom: 40px;">
      <h2>${text.hardwareTitle}</h2>
      <div class="section">
        <p>${text.hardwareDescBefore}<a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>${text.hardwareDescAfter}</p>
      </div>
    </div>

    <div class="privacy">
      <h2>${text.privacyTitle}</h2>
      <div class="section">
        <h3>${text.privacy1Title}</h3>
        <p>${text.privacy1Desc}</p>
      </div>
      <div class="section">
        <h3>${text.privacy2Title}</h3>
        <p>${text.privacy2Desc}</p>
      </div>
      <div class="section">
        <h3>${text.privacy3Title}</h3>
        <ul>
          <li>${text.privacy3Desc1}</li>
          <li>${text.privacy3Desc2}</li>
          <li><strong style="color: #ff6b6b">${text.privacy3Desc3}</strong></li>
          <li>${text.privacy3Desc4}</li>
        </ul>
      </div>
      <div class="section">
        <h3>${text.privacy4Title}</h3>
        <p>${text.privacy4Desc}</p>
      </div>
    </div>
  </main>
  <footer style="flex-direction: column;">
    <span>${text.footer}</span>
    <a href="mailto:supports@echoshorts.win" style="margin-top: 8px;">
      ${text.privacyInquiry}
    </a>
  </footer>
</body>
</html>`;
};

for (const lang of langs) {
  const translations = t[lang.code] || t['en-US'];
  const htmlContent = template(lang.code, translations);
  fs.writeFileSync(path.join(__dirname, lang.file), htmlContent);
  console.log('Created ' + lang.file);
}
