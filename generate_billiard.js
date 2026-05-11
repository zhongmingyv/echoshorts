const fs = require('fs');
const path = require('path');

const langs = [
  { code: 'en-US', file: 'billiard.html', name: 'English' },
  { code: 'zh-CN', file: 'billiard-zh-CN.html', name: '简体中文' },
  { code: 'zh-TW', file: 'billiard-zh-TW.html', name: '繁體中文' },
  { code: 'de-DE', file: 'billiard-de-DE.html', name: 'Deutsch' },
  { code: 'es-ES', file: 'billiard-es-ES.html', name: 'Español' },
  { code: 'fr-FR', file: 'billiard-fr-FR.html', name: 'Français' },
  { code: 'id-ID', file: 'billiard-id-ID.html', name: 'Bahasa Indonesia' },
  { code: 'ja-JP', file: 'billiard-ja-JP.html', name: '日本語' },
  { code: 'ko-KR', file: 'billiard-ko-KR.html', name: '한국어' },
  { code: 'pt-BR', file: 'billiard-pt-BR.html', name: 'Português' },
  { code: 'ru-RU', file: 'billiard-ru-RU.html', name: 'Русский' },
  { code: 'th-TH', file: 'billiard-th-TH.html', name: 'ภาษาไทย' },
  { code: 'vi-VN', file: 'billiard-vi-VN.html', name: 'Tiếng Việt' },
];

const t = {
  'en-US': {
    title: 'Billiard Hall Management System',
    introTitle: 'Local Billiard Hall Management System',
    introDesc: 'Designed for billiard hall branches, providing a one-stop local solution for table management, appliance control, staffing, financial management, and membership services.',
    accountTitle: 'Default Accounts & Permissions',
    passwordLabel: 'Password',
    adminDesc: 'Supreme admin. Highest permissions (menus, departments, permissions, system settings).',
    bossDesc: 'Billiard hall boss. Full access to all business data, financials, and staff management.',
    managerDesc: 'Hall manager. All operational permissions. Can manage users in their own department.',
    receptionDesc: 'Receptionist. Handles table check-ins, member bookings, recharges, and billing.',
    waiterDesc: 'Floor staff. Manages active tables, customer orders, and assistant services.',
    kitchenDesc: 'Kitchen staff. Access to kitchen preparation lists and order fulfillment status.',
    passwordWarningTitle: '⚠️ Crucial First Login Notice',
    passwordWarningDesc: 'After the first login of admin, immediately change the passwords for all default accounts and securely remember the admin password!',
    privacyTitle: 'Privacy Policy & Disclaimer',
    privacy1Title: 'Local Execution & No Internet Required',
    privacy1Desc: 'This software runs entirely locally. It never collects, uploads, or shares your business data (customer info, table orders, financials). Your data is 100% saved on your local hard drive.',
    privacy2Title: 'Data Security & User Responsibility',
    privacy2Desc: 'No cloud sync is provided. You are fully responsible for the security, integrity, and correctness of the data. Please assign employee permissions reasonably to prevent unauthorized access.',
    privacy3Title: 'Data Backup (Critical)',
    privacy3Desc1: 'Regular Backup: Please frequently go to the "Database Management" page to back up data.',
    privacy3Desc2: 'Multi-backup: Strong recommendation to save backups to an external USB drive or cloud storage.',
    privacy3Desc3: 'Before System Changes: BEFORE reinstalling your OS, migrating computers, or uninstalling this software, you MUST first backup and export your data.',
    privacy3Desc4: 'Failure to backup will result in permanent loss of historical orders, finance, and customer info.',
    privacy4Title: 'Disclaimer',
    privacy4Desc: 'The developer bears no legal or financial responsibility for data loss due to hardware damage, viruses, ransomware, employee misconduct, forgetting passwords, or failure to perform regular backups as instructed.',
    storeBtn: 'Download from Microsoft Store',
    footer: '© 2026 echoshorts.win. All rights reserved.',
    contact: 'Contact Us'
  },
  'zh-CN': {
    title: '台球厅管理系统',
    introTitle: '本地化台球厅管理系统',
    introDesc: '专为台球厅门店设计，提供球桌管理、设备控制、员工管理、财务及会员服务等一站式本地化解决方案。',
    accountTitle: '默认账号与权限说明',
    passwordLabel: '密码',
    adminDesc: '系统超级管理员，拥有最高权限（包括菜单、部门、权限、系统设置等）。',
    bossDesc: '台球厅老板/高管，拥有所有业务数据、财务和员工管理的完全访问权限。',
    managerDesc: '台球厅经理，拥有全部日常运营权限；仅限在所在部门下管理或添加用户。',
    receptionDesc: '前台收银，负责球桌开台、会员预订、充值和结账收款等业务。',
    waiterDesc: '服务员，负责管理使用中的球桌、处理顾客点单及提供助理服务。',
    kitchenDesc: '后厨出餐，仅关注后厨备餐清单和订单的完成状态。',
    passwordWarningTitle: '⚠️ 首次登录极其重要提示',
    passwordWarningDesc: '请在 admin 账号首次登录后，立即修改上述所有默认账号的密码，并务必妥善保管且牢记 admin 的密码！',
    privacyTitle: '隐私政策与免责声明',
    privacy1Title: '纯本地化运行与不依赖网络',
    privacy1Desc: '本软件完全在本地运行，绝不收集、上传或共享您的商业数据（如客户信息、订单、财务数据）。您的数据 100% 存储在本地硬盘上。',
    privacy2Title: '数据安全与用户责任',
    privacy2Desc: '系统不提供云端同步功能。您需要对数据的安全性、完整性和准确性负全责。请合理分配员工权限，以防止未经授权的访问。',
    privacy3Title: '数据备份（极其重要📌）',
    privacy3Desc1: '日常备份：请经常前往“数据库管理”页面进行数据备份。',
    privacy3Desc2: '多重备份：强烈建议将备份保存到外部 USB 驱动器或云盘中。',
    privacy3Desc3: '操作前必备份：在重装操作系统、更换电脑或卸载本软件之前，您必须先备份并导出数据。',
    privacy3Desc4: '未备份将导致历史订单、财务和客户信息永久丢失。',
    privacy4Title: '免责声明',
    privacy4Desc: '开发者对因硬件损坏、病毒、勒索软件、员工不当操作、忘记密码或未按提示定期备份而导致的数据丢失不承担任何法律或经济责任。',
    storeBtn: '从 Microsoft Store 下载',
    footer: '© 2026 echoshorts.win. 保留所有权利.',
    contact: '联系我们'
  },
  'zh-TW': {
    title: '撞球館管理系統',
    introTitle: '本地化撞球館管理系統',
    introDesc: '專為撞球館門店設計，提供球桌管理、設備控制、員工管理、財務及會員服務等一站式本地化解決方案。',
    accountTitle: '預設帳號與權限說明',
    passwordLabel: '密碼',
    adminDesc: '系統超級管理員，擁有最高權限（包括菜單、部門、權限、系統設置等）。',
    bossDesc: '撞球館老闆/高管，擁有所有業務數據、財務和員工管理的完全訪問權限。',
    managerDesc: '撞球館經理，擁有全部日常運營權限；僅限在所在部門下管理或添加用戶。',
    receptionDesc: '前台收銀，負責球桌開台、會員預訂、充值和結帳收款等業務。',
    waiterDesc: '服務員，負責管理使用中的球桌、處理顧客點單及提供助理服務。',
    kitchenDesc: '後廚出餐，僅關注後廚備餐清單和訂單的完成狀態。',
    passwordWarningTitle: '⚠️ 首次登入極其重要提示',
    passwordWarningDesc: '請在 admin 帳號首次登入後，立即修改上述所有預設帳號的密碼，並務必妥善保管且牢記 admin 的密碼！',
    privacyTitle: '隱私政策與免責聲明',
    privacy1Title: '純本地化運行與不依賴網路',
    privacy1Desc: '本軟體完全在本地運行，絕不收集、上傳或共享您的商業數據（如客戶資訊、訂單、財務數據）。您的數據 100% 存儲在本地硬碟上。',
    privacy2Title: '數據安全與用戶責任',
    privacy2Desc: '系統不提供雲端同步功能。您需要對數據的安全性、完整性和準確性負全責。請合理分配員工權限，以防止未經授權的訪問。',
    privacy3Title: '數據備份（極其重要📌）',
    privacy3Desc1: '日常備份：請經常前往「數據庫管理」頁面進行數據備份。',
    privacy3Desc2: '多重備份：強烈建議將備份保存到外部 USB 驅動器或雲盤中。',
    privacy3Desc3: '操作前必備份：在重裝操作系統、更換電腦或卸載本軟體之前，您必須先備份並導出數據。',
    privacy3Desc4: '未備份將導致歷史訂單、財務和客戶資訊永久丟失。',
    privacy4Title: '免責聲明',
    privacy4Desc: '開發者對因硬體損壞、病毒、勒索軟體、員工不當操作、忘記密碼或未按提示定期備份而導致的數據丟失不承擔任何法律或經濟責任。',
    storeBtn: '從 Microsoft Store 下載',
    footer: '© 2026 echoshorts.win. 保留所有權利.',
    contact: '聯繫我們'
  },
  'ja-JP': {
    title: 'ビリヤード場管理システム',
    introTitle: 'ローカルビリヤード場管理システム',
    introDesc: 'ビリヤード場店舗向けに設計され、テーブル管理、機器制御、スタッフ配置、財務管理、会員サービスのためのワンストップローカルソリューションを提供します。',
    accountTitle: 'デフォルトアカウントと権限',
    passwordLabel: 'パスワード',
    adminDesc: 'スーパー管理者。最高の権限（メニュー、部門、権限、システム設定）。',
    bossDesc: 'ビリヤード場オーナー。すべての業務データ、財務、スタッフ管理へのフルアクセス。',
    managerDesc: 'マネージャー。すべての運営権限。自身の部門内のユーザーを管理できます。',
    receptionDesc: '受付。テーブルのチェックイン、会員予約、チャージ、請求を処理します。',
    waiterDesc: 'フロアスタッフ。使用中のテーブル、顧客の注文、アシスタントサービスを管理します。',
    kitchenDesc: 'キッチンスタッフ。キッチンの準備リストと注文の処理状況にアクセスできます。',
    passwordWarningTitle: '⚠️ 初回ログイン時の重要なお知らせ',
    passwordWarningDesc: 'adminの初回ログイン後、直ちにすべてのデフォルトアカウントのパスワードを変更し、adminのパスワードを安全に保管してください！',
    privacyTitle: 'プライバシーポリシーと免責事項',
    privacy1Title: 'ローカル実行とインターネット不要',
    privacy1Desc: 'このソフトウェアは完全にローカルで実行されます。業務データ（顧客情報、テーブル注文、財務）を収集、アップロード、共有することはありません。データは100％ローカルハードドライブに保存されます。',
    privacy2Title: 'データセキュリティとユーザーの責任',
    privacy2Desc: 'クラウド同期は提供されません。データの安全性、完全性、正確性に対する全責任はユーザーにあります。不正アクセスを防ぐため、従業員の権限を適切に割り当ててください。',
    privacy3Title: 'データバックアップ（重要）',
    privacy3Desc1: '定期的なバックアップ：頻繁に「データベース管理」ページに移動してデータをバックアップしてください。',
    privacy3Desc2: '複数バックアップ：外部USBドライブやクラウドストレージへのバックアップ保存を強く推奨します。',
    privacy3Desc3: 'システム変更前：OSの再インストール、コンピュータの移行、または本ソフトウェアのアンインストールを行う前に、必ずデータのバックアップとエクスポートを行ってください。',
    privacy3Desc4: 'バックアップを怠ると、履歴の注文、財務、顧客情報が完全に失われます。',
    privacy4Title: '免責事項',
    privacy4Desc: 'ハードウェアの損傷、ウイルス、ランサムウェア、従業員の不正行為、パスワードの忘却、または指示された定期的なバックアップを怠ったことによるデータ損失について、開発者は法的または経済的な責任を負いません。',
    storeBtn: 'Microsoft Store からダウンロード',
    footer: '© 2026 echoshorts.win. 全著作権所有.',
    contact: 'お問い合わせ'
  },
  'ko-KR': {
    title: '당구장 관리 시스템',
    introTitle: '로컬 당구장 관리 시스템',
    introDesc: '당구장 지점을 위해 설계되었으며 테이블 관리, 기기 제어, 인력 관리, 재무 관리 및 회원 서비스를 위한 원스톱 로컬 솔루션을 제공합니다.',
    accountTitle: '기본 계정 및 권한',
    passwordLabel: '비밀번호',
    adminDesc: '최고 관리자. 최고 권한(메뉴, 부서, 권한, 시스템 설정).',
    bossDesc: '당구장 사장. 모든 비즈니스 데이터, 재무 및 직원 관리에 대한 전체 액세스.',
    managerDesc: '매니저. 모든 운영 권한. 자신의 부서 내 사용자를 관리할 수 있습니다.',
    receptionDesc: '카운터. 테이블 체크인, 회원 예약, 충전 및 결제를 처리합니다.',
    waiterDesc: '접객 직원. 사용 중인 테이블, 고객 주문 및 보조 서비스를 관리합니다.',
    kitchenDesc: '주방 직원. 주방 준비 목록 및 주문 처리 상태에 액세스합니다.',
    passwordWarningTitle: '⚠️ 첫 로그인 시 중요 공지',
    passwordWarningDesc: 'admin 첫 로그인 후 즉시 모든 기본 계정의 비밀번호를 변경하고 admin 비밀번호를 안전하게 기억하세요!',
    privacyTitle: '개인정보 보호정책 및 면책 조항',
    privacy1Title: '로컬 실행 및 인터넷 불필요',
    privacy1Desc: '이 소프트웨어는 완전히 로컬에서 실행됩니다. 귀하의 비즈니스 데이터(고객 정보, 테이블 주문, 재무)를 절대로 수집, 업로드 또는 공유하지 않습니다. 귀하의 데이터는 100% 로컬 하드 드라이브에 저장됩니다.',
    privacy2Title: '데이터 보안 및 사용자 책임',
    privacy2Desc: '클라우드 동기화는 제공되지 않습니다. 귀하는 데이터의 보안, 무결성 및 정확성에 대한 전적인 책임이 있습니다. 권한 없는 접근을 방지하기 위해 직원 권한을 합리적으로 할당하십시오.',
    privacy3Title: '데이터 백업 (중요)',
    privacy3Desc1: '정기 백업: 자주 "데이터베이스 관리" 페이지로 이동하여 데이터를 백업하십시오.',
    privacy3Desc2: '다중 백업: 백업을 외부 USB 드라이브나 클라우드 스토리지에 저장하는 것을 강력히 권장합니다.',
    privacy3Desc3: '시스템 변경 전: OS 재설치, 컴퓨터 마이그레이션 또는 이 소프트웨어의 제거를 수행하기 전에 반드시 데이터를 백업하고 내보내야 합니다.',
    privacy3Desc4: '백업을 하지 않으면 이전 주문, 재무 및 고객 정보가 영구적으로 손실될 수 있습니다.',
    privacy4Title: '면책 조항',
    privacy4Desc: '개발자는 하드웨어 손상, 바이러스, 랜섬웨어, 직원의 부당 행위, 비밀번호 분실 또는 지시된 정기 백업을 수행하지 않음으로 인한 데이터 손실에 대해 어떠한 법적 및 재정적 책임도 지지 않습니다.',
    storeBtn: 'Microsoft Store에서 다운로드',
    footer: '© 2026 echoshorts.win. 판권 소유.',
    contact: '문의하기'
  },
  'pt-BR': {
    title: 'Sistema de Gestão de Salão de Bilhar',
    introTitle: 'Sistema Local de Gestão de Bilhar',
    introDesc: 'Projetado para salões de bilhar, oferecendo uma solução local completa para gestão de mesas, controle de aparelhos, equipe, financeiro e membros.',
    accountTitle: 'Contas Padrão e Permissões',
    passwordLabel: 'Senha',
    adminDesc: 'Administrador supremo. Permissões mais altas (menus, departamentos, permissões, configurações).',
    bossDesc: 'Chefe do salão. Acesso total a todos os dados comerciais, finanças e gestão da equipe.',
    managerDesc: 'Gerente. Todas as permissões operacionais. Pode gerenciar usuários no seu próprio departamento.',
    receptionDesc: 'Recepção. Lida com check-ins de mesas, reservas, recargas e cobranças.',
    waiterDesc: 'Garçom. Gerencia mesas ativas, pedidos de clientes e serviços assistentes.',
    kitchenDesc: 'Cozinha. Acesso às listas de preparação da cozinha e status de cumprimento de pedidos.',
    passwordWarningTitle: '⚠️ Aviso Crucial no Primeiro Login',
    passwordWarningDesc: 'Após o primeiro login do admin, altere imediatamente as senhas de todas as contas padrão e memorize com segurança a senha do admin!',
    privacyTitle: 'Política de Privacidade ',
    privacy1Title: 'Execução Local e Sem Internet',
    privacy1Desc: 'Este software roda inteiramente localmente. Nunca coleta, faz upload ou compartilha os dados da sua empresa. Seus dados são salvos 100% no seu disco rígido local.',
    privacy2Title: 'Segurança de Dados e Responsabilidade do Usuário',
    privacy2Desc: 'Nenhuma sincronização na nuvem é fornecida. Você é totalmente responsável pela segurança dos dados. Aloque permissões razoavelmente.',
    privacy3Title: 'Backup de Dados (Crítico)',
    privacy3Desc1: 'Backup Regular: Acesse frequentemente a página "Gestão de Banco de Dados" para fazer backup.',
    privacy3Desc2: 'Multi-backup: Forte recomendação para salvar backups em uma unidade USB.',
    privacy3Desc3: 'Antes de Mudanças: ANTES de reinstalar o SO, migrar computadores ou desinstalar este software, você DEVE fazer backup.',
    privacy3Desc4: 'A falha em fazer backup resultará na perda permanente de finanças e informações de clientes.',
    privacy4Title: 'Isenção de Responsabilidade',
    privacy4Desc: 'O desenvolvedor não assume responsabilidade legal ou financeira por perda de dados devido a danos de hardware, vírus, ransomware ou falta de backups regulares.',
    storeBtn: 'Baixar da Microsoft Store',
    footer: '© 2026 echoshorts.win. Todos os direitos reservados.',
    contact: 'Contate-nos'
  },
  'ru-RU': {
    title: 'Система Управления Бильярдной',
    introTitle: 'Локальная Система Управления Бильярдной',
    introDesc: 'Разработано для бильярдных клубов, предоставляя комплексное локальное решение для управления столами, оборудованием, персоналом, финансами и услугами участников.',
    accountTitle: 'Стандартные Аккаунты и Права',
    passwordLabel: 'Пароль',
    adminDesc: 'Главный админ. Высшие права (меню, отделы, системные настройки).',
    bossDesc: 'Владелец. Полный доступ ко всем бизнес-данным, финансам и управлению персоналом.',
    managerDesc: 'Менеджер зала. Все операционные права. Может управлять пользователями в своем отделе.',
    receptionDesc: 'Администратор. Управляет бронированием столов, пополнениями и выставлением счетов.',
    waiterDesc: 'Официант. Управляет активными столами, заказами клиентов.',
    kitchenDesc: 'Кухня. Доступ к спискам подготовки кухни и статусу выполнения заказов.',
    passwordWarningTitle: '⚠️ Важное уведомление при первом входе',
    passwordWarningDesc: 'После первого входа admin немедленно измените пароли для всех стандартных аккаунтов и надежно запомните пароль admin!',
    privacyTitle: 'Политика Конфиденциальности',
    privacy1Title: 'Локальное Исполнение',
    privacy1Desc: 'Это программное обеспечение работает полностью локально. Оно никогда не собирает и не передает бизнес-данные.',
    privacy2Title: 'Безопасность Данных',
    privacy2Desc: 'Облачная синхронизация не предусмотрена. Вы несете полную ответственность за безопасность данных.',
    privacy3Title: 'Резервное Копирование Данных',
    privacy3Desc1: 'Регулярное Копирование: Часто заходите в "Управление базой данных".',
    privacy3Desc2: 'Множественное Копирование: Настоятельно рекомендуется сохранять резервные копии на внешний USB.',
    privacy3Desc3: 'Перед Изменениями Системы: ПЕРЕД переустановкой ОС или удалением ПО вы ДОЛЖНЫ сделать бэкап.',
    privacy3Desc4: 'Отсутствие резервной копии приведет к потере исторических заказов.',
    privacy4Title: 'Отказ от Ответственности',
    privacy4Desc: 'Разработчик не несет юридической ответственности за потерю данных.',
    storeBtn: 'Скачать из Microsoft Store',
    footer: '© 2026 echoshorts.win. Все права защищены.',
    contact: 'Связаться с нами'
  },
  'es-ES': {
    title: 'Sistema de Gestión de Billares',
    introTitle: 'Gestión Local de Billares',
    introDesc: 'Diseñado para salones de billar, brinda una solución local para la gestión de mesas, dispositivos, personal, finanzas y membresías.',
    accountTitle: 'Cuentas y Permisos',
    passwordLabel: 'Contraseña',
    adminDesc: 'Admin supremo. Permisos más altos (menús, departamentos, configuraciones).',
    bossDesc: 'Jefe del billar. Acceso total a datos, finanzas y personal.',
    managerDesc: 'Gerente. Todos los permisos operativos dentro de su departamento.',
    receptionDesc: 'Recepción. Maneja check-ins, reservas de miembros y cobros.',
    waiterDesc: 'Camarero. Gestiona mesas activas y pedidos de clientes.',
    kitchenDesc: 'Cocina. Acceso al estado de los pedidos y listas de preparación.',
    passwordWarningTitle: '⚠️ Aviso del Primer Inicio de Sesión',
    passwordWarningDesc: '¡Después del primer login, cambie todas las contraseñas predeterminadas de inmediato!',
    privacyTitle: 'Política de Privacidad',
    privacy1Title: 'Ejecución Local',
    privacy1Desc: 'Este software funciona completamente local. Nunca recopila sus datos.',
    privacy2Title: 'Seguridad de Datos',
    privacy2Desc: 'No hay sincronización en la nube. Usted es responsable de la seguridad de los datos.',
    privacy3Title: 'Copia de Seguridad',
    privacy3Desc1: 'Respaldo Regular: Visite "Gestión de Base de Datos" con frecuencia.',
    privacy3Desc2: 'Múltiple Respaldo: Guarde copias en USB o en la nube.',
    privacy3Desc3: 'Antes de migrar: DEBE respaldar sus datos antes de desinstalar o cambiar SO.',
    privacy3Desc4: 'Si no hay respaldo, perderá su historial permanente.',
    privacy4Title: 'Descargo de Responsabilidad',
    privacy4Desc: 'El desarrollador no asume responsabilidad por pérdida de datos debido a ransomware o hardware dañado.',
    storeBtn: 'Descargar de Microsoft Store',
    footer: '© 2026 echoshorts.win. Todos los derechos reservados.',
    contact: 'Contáctenos'
  },
  'fr-FR': {
    title: 'Système de Gestion de Billard',
    introTitle: 'Gestion de Billard Local',
    introDesc: 'Conçu pour les salles de billard, fournissant une solution locale pour la gestion des tables, du personnel et de la finance.',
    accountTitle: 'Comptes par Défaut',
    passwordLabel: 'Mot de passe',
    adminDesc: 'Admin suprême. Autorisations les plus élevées.',
    bossDesc: 'Patron. Accès total aux données de l\'entreprise.',
    managerDesc: 'Gérant. Gère la salle et les utilisateurs.',
    receptionDesc: 'Réception. Gère les réservations de tables et les encaissements.',
    waiterDesc: 'Serveur. Gère les tables actives et les commandes.',
    kitchenDesc: 'Cuisine. Accès à la liste des commandes.',
    passwordWarningTitle: '⚠️ Avis de Première Connexion',
    passwordWarningDesc: 'Veuillez changer les mots de passe par défaut immédiatement après la première connexion !',
    privacyTitle: 'Politique de Confidentialité',
    privacy1Title: 'Exécution Locale',
    privacy1Desc: 'Ce logiciel fonctionne entièrement localement. Aucune donnée n\'est envoyée sur le net.',
    privacy2Title: 'Sécurité des Données',
    privacy2Desc: 'Aucune synchronisation cloud. Affectez les autorisations raisonnablement.',
    privacy3Title: 'Sauvegarde des Données (Critique)',
    privacy3Desc1: 'Faites des sauvegardes régulières dans la Gestion de Base de Données.',
    privacy3Desc2: 'Il est recommandé d\'enregistrer les sauvegardes sur USB.',
    privacy3Desc3: 'AVANT de réinstaller l\'OS, vous DEVEZ faire une sauvegarde.',
    privacy3Desc4: 'Ne pas sauvegarder entraînera une perte permanente.',
    privacy4Title: 'Avertissement',
    privacy4Desc: 'Le développeur n\'est pas responsable de la perte de données.',
    storeBtn: 'Télécharger depuis le Microsoft Store',
    footer: '© 2026 echoshorts.win. Tous droits réservés.',
    contact: 'Nous Contacter'
  },
  'de-DE': {
    title: 'Billard-Management-System',
    introTitle: 'Lokales Billard-Management',
    introDesc: 'Entwickelt für Billardhallen, bietet es eine lokale Lösung für Tischverwaltung, Personal, Finanzen und Mitgliedschaften.',
    accountTitle: 'Standardkonten',
    passwordLabel: 'Passwort',
    adminDesc: 'Super-Admin. Höchste Rechte (Systemeinstellungen, Menüs).',
    bossDesc: 'Boss. Vollzugriff auf alle Geschäftsdaten und Finanzen.',
    managerDesc: 'Manager. Alle operativen Rechte.',
    receptionDesc: 'Rezeption. Tischbuchungen, Aufladungen und Abrechnungen.',
    waiterDesc: 'Kellner. Tischverwaltung und Kundenbestellungen.',
    kitchenDesc: 'Küche. Bestellungen und Zubereitungsliste.',
    passwordWarningTitle: '⚠️ Wichtiger erster Login',
    passwordWarningDesc: 'Ändern Sie die Passwörter sofort nach dem ersten Login!',
    privacyTitle: 'Datenschutzerklärung',
    privacy1Title: 'Lokale Ausführung',
    privacy1Desc: 'Die Software läuft lokal. Es werden keine Daten hochgeladen.',
    privacy2Title: 'Datensicherheit',
    privacy2Desc: 'Keine Cloud. Sie sind voll verantwortlich für Datensicherheit.',
    privacy3Title: 'Datensicherung (Kritisch)',
    privacy3Desc1: 'Regelmäßig über Datenbankmanagement sichern.',
    privacy3Desc2: 'Speichern Sie das Backup extern (USB).',
    privacy3Desc3: 'Vor OS-Änderung oder Deinstallation: MÜSSEN Sie Daten sichern.',
    privacy3Desc4: 'Ohne Backup droht kompletter Datenverlust.',
    privacy4Title: 'Haftungsausschluss',
    privacy4Desc: 'Keine Haftung für Datenverlust durch Hardwarefehler oder fehlendes Backup.',
    storeBtn: 'Aus dem Microsoft Store herunterladen',
    footer: '© 2026 echoshorts.win. Alle Rechte vorbehalten.',
    contact: 'Kontakt'
  },
  'id-ID': {
    title: 'Sistem Manajemen Biliar',
    introTitle: 'Manajemen Biliar Lokal',
    introDesc: 'Dirancang untuk cabang biliar, menyediakan solusi lokal untuk mengelola meja, keuangan, staf, dan anggota.',
    accountTitle: 'Akun Standar',
    passwordLabel: 'Kata sandi',
    adminDesc: 'Admin utama. Izin tertinggi.',
    bossDesc: 'Pemilik. Akses ke semua data perusahaan.',
    managerDesc: 'Manajer. Izin operasional penuh.',
    receptionDesc: 'Resepsionis. Mengelola pemesanan meja dan penagihan.',
    waiterDesc: 'Pelayan. Mengelola pesanan meja aktif.',
    kitchenDesc: 'Dapur. Akses daftar pesanan hidangan.',
    passwordWarningTitle: '⚠️ Catatan Login Pertama',
    passwordWarningDesc: 'Ubah semua kata sandi secara langsung setelah login pertama!',
    privacyTitle: 'Kebijakan Privasi',
    privacy1Title: 'Lokal Sepenuhnya',
    privacy1Desc: 'Tidak ada data yang dikumpulkan atau diunggah ke internet.',
    privacy2Title: 'Keamanan Data',
    privacy2Desc: 'Tidak ada cloud sinkron. Anda bertanggung jawab penuh.',
    privacy3Title: 'Cadangan Data (Kritis)',
    privacy3Desc1: 'Sering kunjungi halaman Manajemen Database untuk cadangan.',
    privacy3Desc2: 'Simpan ke disk USB / cloud.',
    privacy3Desc3: 'Anda HARUS mencadangkan sebelum menginstal ulang OS.',
    privacy3Desc4: 'Kegagalan mencadangkan mengakibatkan kehilangan pesanan sejarah.',
    privacy4Title: 'Penafian',
    privacy4Desc: 'Pengembang tidak menanggung tanggung jawab hukum atas kerugian data.',
    storeBtn: 'Unduh dari Microsoft Store',
    footer: '© 2026 echoshorts.win. Hak Cipta Dilindungi.',
    contact: 'Hubungi'
  },
  'vi-VN': {
    title: 'Hệ thống Quản lý Bida',
    introTitle: 'Quản lý Bida Nội bộ',
    introDesc: 'Được thiết kế cho các quán bida, cung cấp giải pháp cục bộ để quản lý bàn, nhân viên, tài chính.',
    accountTitle: 'Tài khoản Mặc định',
    passwordLabel: 'Mật khẩu',
    adminDesc: 'Quản trị viên. Quyền cao nhất.',
    bossDesc: 'Chủ quán. Truy cập toàn bộ dữ liệu kinh doanh.',
    managerDesc: 'Quản lý. Quyền điều hành.',
    receptionDesc: 'Lễ tân. Quản lý nhận bàn, đặt trước, thu ngân.',
    waiterDesc: 'Phục vụ. Quản lý các bàn đang hoạt động.',
    kitchenDesc: 'Bếp. Quản lý danh sách chuẩn bị đồ ăn.',
    passwordWarningTitle: '⚠️ Chú ý Đăng nhập Lần đầu',
    passwordWarningDesc: 'Thay đổi mật khẩu mặc định ngay sau khi đăng nhập!',
    privacyTitle: 'Chính sách Bảo mật',
    privacy1Title: 'Thi hành Cục bộ',
    privacy1Desc: 'Phần mềm hoạt động hoàn toàn offline, 100% dữ liệu ở ổ cứng.',
    privacy2Title: 'Bảo mật Dữ liệu',
    privacy2Desc: 'Không đồng bộ đám mây.',
    privacy3Title: 'Sao lưu (Rất Quan trọng)',
    privacy3Desc1: 'Sao lưu thường xuyên qua trang Quản lý CSDL.',
    privacy3Desc2: 'Lưu vào cổng USB bên ngoài.',
    privacy3Desc3: 'Phải sao lưu trước khi cài lại Win hoặc gỡ phần mềm.',
    privacy3Desc4: 'Nếu không sao lưu sẽ mất hết đơn hàng.',
    privacy4Title: 'Tuyên bố Khước từ',
    privacy4Desc: 'Nhà phát triển không chịu trách nhiệm pháp lý khi mất dữ liệu.',
    storeBtn: 'Tải xuống từ Microsoft Store',
    footer: '© 2026 echoshorts.win. Mọi quyền được bảo lưu.',
    contact: 'Liên hệ'
  },
  'th-TH': {
    title: 'ระบบการจัดการร้านบิลเลียด',
    introTitle: 'ระบบการจัดการบิลเลียดโลคัล',
    introDesc: 'ออกแบบมาสำหรับร้านบิลเลียด จัดการโต๊ะ พนักงาน การเงิน และสมาชิก',
    accountTitle: 'บัญชีและการให้สิทธิ์',
    passwordLabel: 'รหัสผ่าน',
    adminDesc: 'ผู้ดูแลสูงสุด สิทธิ์ระดับสูงสุด',
    bossDesc: 'เจ้าของ เข้าถึงข้อมูล การเงิน พนักงาน ได้ทั้งหมด',
    managerDesc: 'ผู้จัดการ สิทธิ์ควบคุมภายในแผนกตัวเอง',
    receptionDesc: 'ต้อนรับ จัดการโต๊ะ จอง สมาชิกและการเรียกเก็บเงิน',
    waiterDesc: 'พนักงานเสิร์ฟ จัดการโต๊ะและรับออเดอร์',
    kitchenDesc: 'ผู้ช่วยครัว ดูแลออเดอร์ทำอาหาร',
    passwordWarningTitle: '⚠️ โปรดทราบเมื่อล็อกอินครั้งแรก',
    passwordWarningDesc: 'เปลี่ยนรหัสผ่านทันทีหลังล็อกอินแอดมินครั้งแรก!',
    privacyTitle: 'นโยบายความเป็นส่วนตัว',
    privacy1Title: 'การทำงานโลคัลทั้งหมด',
    privacy1Desc: 'ระบบนี้ไม่มีการส่งข้อมูลใดๆ ไปยังเซิร์ฟเวอร์ ข้อมูล 100% อยู่ที่ฮาร์ดดิสก์',
    privacy2Title: 'ความปลอดภัยข้อมูล',
    privacy2Desc: 'รับผิดชอบข้อมูลของคุณเอง ไม่มีระบบคลาวด์',
    privacy3Title: 'การสำรองข้อมูล (สำคัญมาก)',
    privacy3Desc1: 'โปรดสำรองข้อมูลด้วยเมนูจัดการฐานข้อมูลเป็นประจำ',
    privacy3Desc2: 'ควรสำรองลงอุปกรณ์ USB',
    privacy3Desc3: 'ก่อนลง Windows ใหม่ ต้องสำรองข้อมูลทุกครั้ง',
    privacy3Desc4: 'การละเลยสำรองข้อมูลทำให้ข้อมูลประวัติสูญหาย',
    privacy4Title: 'ข้อสงวนสิทธิ์',
    privacy4Desc: 'ผู้พัฒนาไม่รับผิดชอบการสูญเสียข้อมูล',
    storeBtn: 'ดาวน์โหลดจาก Microsoft Store',
    footer: '© 2026 echoshorts.win ลิขสิทธิ์ถูกต้อง',
    contact: 'ติดต่อ'
  }
};

const makeOptions = (lang) => {
  return langs.map(l => {
    return `      <option value="${l.file}"${l.code === lang ? ' selected' : ''}>${l.name}</option>`;
  }).join('\n');
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
    main { flex: 1; max-width: 900px; margin: 0 auto; padding: 60px 40px 40px; width: 100%; }
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

    footer { text-align: center; padding: 20px 40px; border-top: 1px solid #1a1a1a; display: flex; justify-content: center; align-items: center; gap: 28px; }
    footer span { font-size: 12px; color: #444; }
    footer a { font-size: 12px; color: #666; text-decoration: none; }
    footer a:hover { color: #4ade80; }
    
    .lang-switcher { width: 100%; max-width: 900px; margin: 0 auto; padding: 20px 40px 0; display: flex; justify-content: flex-end; }
    .lang-switcher select { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 6px; color: #e0e0e0; font-size: 12px; padding: 5px 8px; cursor: pointer; outline: none; }
    .lang-switcher select:hover { border-color: #4ade80; }
    .btn-row { display: flex; gap: 10px; margin: 14px 0; flex-wrap: wrap; }
    .btn { display: inline-block; padding: 9px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; text-decoration: none !important; transition: opacity .15s; }
    .btn:hover { opacity: 0.85; }
    .btn-green { background: #4ade80; color: #0f0f0f; }

    @media (max-width: 600px) {
      .features { grid-template-columns: 1fr; }
    }
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
      <h1>${text.introTitle.replace(' ', '<br><span>').replace(/Billiard Hall Management System/g, '<span>Billiard Hall Management System</span>').replace(/台球厅/g, '<span>台球厅').replace(/撞球館/g, '<span>撞球館').replace(/Billard-Management/, '<span>Billard-Management')}</span></h1>
      <p>${text.introDesc}</p>
    </div>

    <div class="btn-row" style="margin-bottom: 30px;">
      <a class="btn btn-green" href="ms-windows-store://pdp/?productid=9N261TVCHTLP">${text.storeBtn}</a>
    </div>

    <h2 style="font-size: 15px; margin-bottom:20px;border-bottom: 1px solid #222;padding-bottom:14px;">${text.accountTitle}</h2>
    <div class="features">
      <div class="card">
        <h3>admin (${text.passwordLabel}: admin123)</h3>
        <p>${text.adminDesc}</p>
      </div>
      <div class="card">
        <h3>boss (${text.passwordLabel}: boss123)</h3>
        <p>${text.bossDesc}</p>
      </div>
      <div class="card">
        <h3>manager (${text.passwordLabel}: manager123)</h3>
        <p>${text.managerDesc}</p>
      </div>
      <div class="card">
        <h3>reception (${text.passwordLabel}: reception123)</h3>
        <p>${text.receptionDesc}</p>
      </div>
      <div class="card">
        <h3>waiter (${text.passwordLabel}: waiter123)</h3>
        <p>${text.waiterDesc}</p>
      </div>
      <div class="card">
        <h3>kitchen (${text.passwordLabel}: kitchen123)</h3>
        <p>${text.kitchenDesc}</p>
      </div>
    </div>

    <div class="hint">
      <div>
        <h4>${text.passwordWarningTitle}</h4>
        <p>${text.passwordWarningDesc}</p>
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
      ${lang.startsWith('zh') ? '如需咨询隐私相关问题，请发送邮件至 supports@echoshorts.win' : 'For privacy-related inquiries, please email supports@echoshorts.win'}
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
