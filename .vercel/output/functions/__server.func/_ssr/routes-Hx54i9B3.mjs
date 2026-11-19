import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { A as Bell, C as FileText, D as Check, E as ChevronDown, M as ArrowUp, N as ArrowLeft, O as CheckCheck, S as Image, T as Copy, _ as Mic, a as Trash2, b as Mail, c as Settings, d as Play, f as Pin, g as Paperclip, h as Pause, j as BellOff, k as Bookmark, l as Search, m as Pencil, n as Users, o as SquarePen, p as PinOff, r as User, s as Smile, t as X, u as Reply, v as MessageCircle, w as Ellipsis, x as Info, y as Megaphone } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as DropdownMenuTrigger, i as DropdownMenuPortal, n as DropdownMenuContent, r as DropdownMenuItem, t as DropdownMenu } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { a as PopoverTrigger, i as PopoverPortal, n as PopoverClose, r as PopoverContent, t as Popover } from "../_libs/radix-ui__react-popover.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Hx54i9B3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MEDIA = [
	{
		src: "/media/forest.jpg",
		alt: "Снежная тропа между соснами"
	},
	{
		src: "/media/aurora.jpg",
		alt: "Северное сияние над замёрзшим озером"
	},
	{
		src: "/media/river.jpg",
		alt: "Река в синий час"
	},
	{
		src: "/media/desk.jpg",
		alt: "Стол с набросками и чашка кофе"
	}
];
var EMOJI = [
	"😀",
	"😁",
	"😂",
	"😊",
	"😍",
	"😎",
	"🤔",
	"😅",
	"😢",
	"👍",
	"👏",
	"🔥",
	"❤️",
	"✨",
	"🎉",
	"👀",
	"🙏",
	"⭐",
	"❄️",
	"🌙",
	"⚡",
	"💬",
	"📌",
	"🎵"
];
var REACTIONS = [
	"❤️",
	"👍",
	"😂",
	"🔥",
	"👀",
	"🎉"
];
var photoCursor = 0;
function takePhoto() {
	const item = MEDIA[photoCursor % MEDIA.length];
	photoCursor += 1;
	return item;
}
function newId(prefix) {
	return `${prefix}_${crypto.randomUUID()}`;
}
function patternFrom(id) {
	let h = 0;
	for (const c of id) h = h * 31 + c.charCodeAt(0) >>> 0;
	return h % 6;
}
function initials(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "•";
	if (parts.length === 1) return parts[0].slice(0, 2).toLocaleUpperCase("ru");
	return (parts[0][0] + parts[1][0]).toLocaleUpperCase("ru");
}
function plural(n, one, few, many) {
	const n10 = n % 10;
	const n100 = n % 100;
	if (n10 === 1 && n100 !== 11) return one;
	if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return few;
	return many;
}
function formatCount(n) {
	return new Intl.NumberFormat("ru-RU").format(n);
}
function pad(n) {
	return String(n).padStart(2, "0");
}
function clock(ts) {
	const d = new Date(ts);
	return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function startOfDay(ts) {
	const d = new Date(ts);
	return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}
function isSameDay(a, b) {
	return startOfDay(a) === startOfDay(b);
}
function isToday(ts) {
	return isSameDay(ts, Date.now());
}
function isYesterday(ts) {
	const y = /* @__PURE__ */ new Date();
	y.setDate(y.getDate() - 1);
	return isSameDay(ts, y.getTime());
}
var WD = [
	"вс",
	"пн",
	"вт",
	"ср",
	"чт",
	"пт",
	"сб"
];
var MON = [
	"янв",
	"фев",
	"мар",
	"апр",
	"мая",
	"июн",
	"июл",
	"авг",
	"сен",
	"окт",
	"ноя",
	"дек"
];
var MONF = [
	"января",
	"февраля",
	"марта",
	"апреля",
	"мая",
	"июня",
	"июля",
	"августа",
	"сентября",
	"октября",
	"ноября",
	"декабря"
];
function listTime(ts) {
	if (isToday(ts)) return clock(ts);
	if (isYesterday(ts)) return "вчера";
	const d = new Date(ts);
	if (Date.now() - ts < 6048e5) return WD[d.getDay()] ?? "";
	return `${d.getDate()} ${MON[d.getMonth()] ?? ""}`;
}
function dayLabel(ts) {
	if (isToday(ts)) return "Сегодня";
	if (isYesterday(ts)) return "Вчера";
	const d = new Date(ts);
	return `${d.getDate()} ${MONF[d.getMonth()] ?? ""}`;
}
function messagePreview(m) {
	if (m.kind === "voice") return "Голосовое сообщение";
	if (m.kind === "photo") return m.text.trim() ? m.text : "Фото";
	if (m.kind === "file") return m.fileName ?? "Файл";
	return m.text;
}
function previewPrefix(chat, m) {
	if (m.senderId === "me") {
		if (chat.kind === "saved" || chat.kind === "channel") return "";
		return "Вы: ";
	}
	if (chat.kind === "group") {
		const name = chat.members?.find((x) => x.id === m.senderId)?.name.split(" ")[0];
		return name ? `${name}: ` : "";
	}
	return "";
}
function senderName(chat, senderId, meName) {
	if (senderId === "me") return meName;
	const member = chat.members?.find((m) => m.id === senderId);
	if (member) return member.name;
	return chat.title;
}
function chatUnread(chatId, messages) {
	let n = 0;
	for (const m of messages) if (m.chatId === chatId && m.senderId !== "me" && m.senderId !== "system" && !m.read) n += 1;
	return n;
}
function lastMessage(chatId, messages) {
	let best;
	for (const m of messages) {
		if (m.chatId !== chatId || m.kind === "system") continue;
		if (!best || m.createdAt >= best.createdAt) best = m;
	}
	return best;
}
function inFolder(chat, folder, unread) {
	if (folder === "all") return true;
	if (folder === "unread") return unread > 0;
	if (folder === "direct") return chat.kind === "direct" || chat.kind === "saved";
	return chat.kind === folder;
}
function sortChats(chats, messages) {
	const act = (c) => {
		let max = c.createdAt;
		for (const m of messages) if (m.chatId === c.id && m.createdAt > max) max = m.createdAt;
		return max;
	};
	return [...chats].sort((a, b) => {
		if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
		return act(b) - act(a);
	});
}
function presence(chat) {
	if (chat.kind === "saved") return {
		label: "заметки себе",
		live: false
	};
	if (chat.kind === "group") {
		const n = (chat.members?.length ?? 0) + 1;
		return {
			label: `${n} ${plural(n, "участник", "участника", "участников")}`,
			live: false
		};
	}
	if (chat.kind === "channel") {
		const n = chat.subscribers ?? 0;
		return {
			label: `${formatCount(n)} ${plural(n, "подписчик", "подписчика", "подписчиков")}`,
			live: false
		};
	}
	if (chat.online) return {
		label: "в сети",
		live: true
	};
	const verb = chat.gender === "f" ? "была" : chat.gender === "m" ? "был" : "был(а)";
	if (!chat.lastSeen) return {
		label: "не в сети",
		live: false
	};
	if (isToday(chat.lastSeen)) return {
		label: `${verb} в ${clock(chat.lastSeen)}`,
		live: false
	};
	if (isYesterday(chat.lastSeen)) return {
		label: `${verb} вчера`,
		live: false
	};
	return {
		label: `${verb} недавно`,
		live: false
	};
}
function waveBars(seed, n = 26) {
	let h = 0;
	for (const c of seed) h = h * 33 + c.charCodeAt(0) >>> 0;
	const out = [];
	for (let i = 0; i < n; i += 1) {
		h = h * 1664525 + 1013904223 >>> 0;
		out.push(28 + h % 72);
	}
	return out;
}
function folderUnread(folder, chats, messages) {
	let n = 0;
	for (const chat of chats) {
		const u = chatUnread(chat.id, messages);
		if (u > 0 && inFolder(chat, folder, u) && (folder !== "all" || true)) {
			if (folder === "all") n += u;
			else if (inFolder(chat, folder, u)) n += u;
		}
	}
	return n;
}
function buildSeed() {
	const now = Date.now();
	const t = (mins) => now - mins * 6e4;
	const me = {
		name: "Алекс Морозов",
		username: "alexmor",
		about: "Делаю продукты. Пишу коротко."
	};
	const chats = [
		{
			id: "saved",
			kind: "saved",
			title: "Избранное",
			about: "Заметки, которые не должны потеряться в чужих чатах.",
			gender: "n",
			pinned: true,
			muted: false,
			pattern: 1,
			createdAt: t(1800)
		},
		{
			id: "masha",
			kind: "direct",
			title: "Маша Лебедева",
			username: "masha_l",
			about: "Архитектор. Карелия — это серьёзно.",
			phone: "+7 921 555-19-04",
			gender: "f",
			online: true,
			pinned: true,
			muted: false,
			pattern: 2,
			createdAt: t(2e3)
		},
		{
			id: "team",
			kind: "group",
			title: "Команда Север",
			about: "Запуск, макеты и никакой презентации на сорок слайдов.",
			gender: "n",
			pinned: true,
			muted: false,
			pattern: 0,
			createdAt: t(300),
			members: [
				{
					id: "lena",
					name: "Лена Сокол",
					gender: "f"
				},
				{
					id: "oleg",
					name: "Олег Брик",
					gender: "m"
				},
				{
					id: "nina",
					name: "Нина Варламова",
					gender: "f"
				}
			]
		},
		{
			id: "bureau",
			kind: "channel",
			title: "Северное бюро",
			username: "sever_bureau",
			about: "Заметки бюро о цвете, тишине и плотных интерфейсах.",
			gender: "n",
			pinned: false,
			muted: false,
			pattern: 4,
			createdAt: t(900),
			subscribers: 12843
		},
		{
			id: "kirill",
			kind: "direct",
			title: "Кирилл Новиков",
			username: "kir_nov",
			about: "Играет в дождь. Зовет без предупреждения.",
			phone: "+7 911 555-08-08",
			gender: "m",
			online: true,
			pinned: false,
			muted: false,
			pattern: 3,
			createdAt: t(80)
		},
		{
			id: "dasha",
			kind: "direct",
			title: "Даша Орлова",
			username: "dasha_north",
			about: "Снимает небо, когда нормальные люди спят.",
			gender: "f",
			online: true,
			pinned: false,
			muted: false,
			pattern: 5,
			createdAt: t(110)
		},
		{
			id: "ilya",
			kind: "direct",
			title: "Илья Ким",
			username: "kim_sound",
			about: "Пишет музыку и не спит.",
			phone: "+7 911 555-44-20",
			gender: "m",
			online: false,
			lastSeen: t(300),
			pinned: false,
			muted: false,
			pattern: 1,
			createdAt: t(400)
		},
		{
			id: "neighbors",
			kind: "group",
			title: "Соседи, дом 12",
			about: "Тамбур, велики и коробки, которые «сейчас уберут».",
			gender: "n",
			pinned: false,
			muted: true,
			pattern: 2,
			createdAt: t(1300),
			members: [
				{
					id: "ira",
					name: "Ира Котова",
					gender: "f"
				},
				{
					id: "pavel",
					name: "Павел",
					gender: "m"
				},
				{
					id: "sveta",
					name: "Света",
					gender: "f"
				}
			]
		},
		{
			id: "dad",
			kind: "direct",
			title: "Папа",
			about: "Дача, крыша и звонок вместо переписки.",
			phone: "+7 812 555-01-14",
			gender: "m",
			online: false,
			lastSeen: t(1700),
			pinned: false,
			muted: false,
			pattern: 0,
			createdAt: t(1800)
		},
		{
			id: "lera",
			kind: "direct",
			title: "Лера Волк",
			username: "lera_reads",
			about: "Книжный клуб, который иногда пьёт чай.",
			gender: "f",
			online: false,
			lastSeen: t(4e3),
			pinned: false,
			muted: true,
			pattern: 4,
			createdAt: t(4200)
		}
	];
	const m = (id, chatId, senderId, text, mins, extra = {}) => ({
		id,
		chatId,
		senderId,
		text,
		createdAt: t(mins),
		kind: "text",
		read: true,
		reactions: [],
		...extra
	});
	return {
		me,
		chats,
		messages: [
			m("saved-1", "saved", "me", "Пароль от стенда лежит в менеджере, не в чате.", 1800),
			m("saved-2", "saved", "me", "Плотность списка: имя, время, одна строка превью.", 400, {
				kind: "photo",
				photo: MEDIA[3].src
			}),
			m("saved-3", "saved", "me", "Папки, голосовые, тихий режим. Ответ — кнопкой, не жестом.", 50),
			m("masha-1", "masha", "me", "Маш, мы всё-таки в Карелию?", 2e3),
			m("masha-2", "masha", "masha", "Да. Нашла дом у Ладоги, с печкой и одной розеткой.", 1900),
			m("masha-3", "masha", "me", "Скинь, как выглядит. И сколько с нас.", 1800),
			m("masha-4", "masha", "masha", "Вид из окна. Связи почти нет — пиши заранее.", 1700, {
				kind: "photo",
				photo: MEDIA[0].src
			}),
			m("masha-5", "masha", "me", "Беру термос и нормальные носки. Поезд в пятницу?", 1600),
			m("masha-6", "masha", "masha", "18:40, Ладожский. Билеты на мне, еда на тебе.", 1400),
			m("masha-7", "masha", "masha", "И зарядку. Розетка правда одна.", 8, { read: false }),
			m("masha-8", "masha", "masha", "Ты ещё тут?", 3, { read: false }),
			m("team-0", "team", "system", "Лена создала группу «Команда Север»", 300, { kind: "system" }),
			m("team-1", "team", "lena", "Сбор через 15 минут. Без презентации на сорок слайдов.", 200),
			m("team-2", "team", "oleg", "Сократил до девяти. Макет в файле.", 180),
			m("team-3", "team", "oleg", "", 170, {
				kind: "file",
				fileName: "Макет-север.pdf",
				fileSize: "1,8 МБ"
			}),
			m("team-4", "team", "me", "Заголовок на первом экране слишком тихий.", 80),
			m("team-5", "team", "nina", "Согласна. Кнопка «Написать» должна быть на виду, не в меню.", 70, { replyToId: "team-4" }),
			m("team-6", "team", "lena", "Фиксируем: плотный список, акцент только на непрочитанном и отправке.", 40, { reactions: [{
				emoji: "🔥",
				mine: true,
				others: 1
			}] }),
			m("team-7", "team", "nina", "Обновила сетку. Гляньте до обеда?", 18, { read: false }),
			m("team-8", "team", "oleg", "Глянул. На мобиле поиск прилипает сверху — так и оставим.", 11, { read: false }),
			m("bur-1", "bureau", "bureau", "Цвет ночного интерфейса мы сняли с реки в синий час, а не заняли у чужого мессенджера. Тёмный фон, один акцент, плотные строки.", 900),
			m("bur-2", "bureau", "bureau", "Река, с которой снят цвет NORD.", 500, {
				kind: "photo",
				photo: MEDIA[2].src
			}),
			m("bur-3", "bureau", "bureau", "На этой неделе: папки чатов, голосовые без облака и тихое правило — ничего не уезжает с устройства.", 400, { read: false }),
			m("k-1", "kirill", "kirill", "Футбол в восемь. Ты в деле?", 80),
			m("k-2", "kirill", "me", "Если дождя не будет.", 60),
			m("k-3", "kirill", "kirill", "Дождь будет. Всё равно играем.", 40),
			m("k-4", "kirill", "kirill", "Форму не забудь. В прошлый раз ты вышел в пальто.", 28, { read: false }),
			m("dasha-1", "dasha", "dasha", "Смотри, что над озером в два часа ночи.", 110, {
				kind: "photo",
				photo: MEDIA[1].src,
				reactions: [{
					emoji: "❤️",
					mine: true,
					others: 0
				}]
			}),
			m("dasha-2", "dasha", "me", "Это незаконно красиво.", 100),
			m("dasha-3", "dasha", "dasha", "Приезжай. Комары там размером с кнопку отправки.", 95),
			m("ilya-1", "ilya", "ilya", "Черновик ритма. Барабаны сырые.", 400, {
				kind: "voice",
				voiceSec: 18
			}),
			m("ilya-2", "ilya", "me", "Барабаны как раз живые. Припев можно короче.", 320),
			m("ilya-3", "ilya", "ilya", "Укорочу. Вечером скину ещё дубль.", 300),
			m("n-1", "neighbors", "ira", "Кто поставил велик в тамбуре?", 1300),
			m("n-2", "neighbors", "pavel", "Мой, уберу через час. Честно.", 1260),
			m("n-3", "neighbors", "me", "Там ещё коробка — она моя. Заберу вечером.", 1200),
			m("dad-1", "dad", "dad", "Сынок, ты ел?", 1800),
			m("dad-2", "dad", "me", "Ел. Как дача?", 1750),
			m("dad-3", "dad", "dad", "Снег с крыши скинул. Мать просит позвонить, не писать.", 1700),
			m("dad-4", "dad", "me", "Наберу вечером.", 1680),
			m("l-1", "lera", "lera", "Дочитала. Финал злой, но честный.", 4200),
			m("l-2", "lera", "me", "Я на середине. Не спойлери, прошу.", 4100),
			m("l-3", "lera", "lera", "Молчу. Чай в четверг всё ещё в силе?", 4e3)
		]
	};
}
var GENERIC = {
	rules: [
		{
			test: /привет|здравств/i,
			replies: ["Привет. Я на связи.", "Привет! Что стряслось?"]
		},
		{
			test: /спасибо/i,
			replies: ["Не за что.", "Всегда пожалуйста."]
		},
		{
			test: /фото|картин/i,
			replies: ["Вижу. Красиво.", "Сохраню себе."]
		}
	],
	any: [
		"Понял.",
		"Давай так.",
		"Ок, я рядом.",
		"Расскажи чуть подробнее.",
		"Хорошо, отпишусь."
	]
};
var BANKS = {
	masha: {
		rules: [
			{
				test: /привет|здравств/i,
				replies: ["Привет. Я как раз маршрут смотрю.", "Привет! Ты уже собрался?"]
			},
			{
				test: /билет|поезд|пятниц|ладож/i,
				replies: ["Беру два места у окна. 18:40 не двигаем.", "Если опоздаешь — пиши, я у вагона."]
			},
			{
				test: /заряд|розетк|носк|еда|сыр|хлеб/i,
				replies: ["Кинь в рюкзак сразу, а то вспомним уже в электричке.", "Я взяла чай. Хлеб всё-таки на тебе."]
			},
			{
				test: /карел|дом|печк/i,
				replies: ["Дом тёплый, обещали. Дрова есть.", "Если выедем вовремя, к ночи будем у печки."]
			},
			{
				test: /фото|вид|окн/i,
				replies: ["Это ещё скромный ракурс. С озера лучше.", "Связь там рваная, не теряй сообщение."]
			}
		],
		any: [
			"Угу.",
			"Записала.",
			"Да, давай.",
			"Секунду — допишу и отвечу нормально.",
			"Звучит правильно."
		]
	},
	team: {
		rules: [{
			test: /кнопк|акцент|список|мобил|поиск/i,
			replies: [
				"Принято, поправлю в макете.",
				"Не раздуваем. Фиксирую как есть.",
				"Ок, гляну отступы на узком экране."
			]
		}, {
			test: /обед|сетк|макет|файл/i,
			replies: ["Смотрю файл. Напишу, если что-то разъедется.", "Обновлю и кину сюда, без сорока слайдов."]
		}],
		any: [
			"Ок, беру.",
			"Принято.",
			"Не раздуваем список.",
			"Напишу, как сверю.",
			"Да, так и оставим."
		]
	},
	kirill: {
		rules: [{
			test: /привет/i,
			replies: ["Здарова. Ты сегодня выходишь?", "Привет. Форма при тебе?"]
		}, {
			test: /дожд|футбол|форм|пальто|восемь|8/i,
			replies: [
				"Дождь — не отмена. Выходим.",
				"Форму всё-таки надень. Пальто оставь дома.",
				"В восемь у ворот, не у кофейни."
			]
		}],
		any: [
			"Годно.",
			"Тогда до вечера.",
			"Не соскочи.",
			"Ок, я предупрежу остальных.",
			"Коротко и ясно."
		]
	},
	dasha: {
		rules: [{
			test: /привет/i,
			replies: ["Привет. Небо сегодня тихое, но я слежу.", "Привет! Ты видел вчерашний кадр?"]
		}, {
			test: /фото|озер|сия|красив|комар/i,
			replies: [
				"Приезжай, место покажу без карты в чате.",
				"Комары честные: кусают только красивых.",
				"Сняла ещё один, но этот честнее."
			]
		}],
		any: [
			"Ага.",
			"Красиво сказал.",
			"Скину, если поймаю ещё.",
			"Не пропадай.",
			"Ок, жду."
		]
	},
	ilya: {
		rules: [{
			test: /привет/i,
			replies: ["Привет. Я в наушниках, пиши.", "Привет. Слушаю твой прошлый комментарий."]
		}, {
			test: /барабан|припев|голос|трек|ритм|музык/i,
			replies: [
				"Укорочу припев и сниму барабаны суше.",
				"Ок, оставлю живые, но тише на куплет.",
				"Вечером будет новый дубль. Не рассылай этот."
			]
		}],
		any: [
			"Слышу.",
			"Запишу.",
			"Ок, не рассылаю.",
			"Дай час.",
			"Принял, без спора."
		]
	},
	neighbors: {
		rules: [{
			test: /велик|короб|тамбур/i,
			replies: [
				"Уберу, только найду ключ от кладовки.",
				"Коробку видела, она никому не мешает. Почти.",
				"В тамбуре снова узко. Давайте до вечера."
			]
		}],
		any: [
			"Хорошо.",
			"Напишу в домовой, если не уберут.",
			"Ок.",
			"Поняла.",
			"Не начинайте без меня."
		]
	},
	dad: {
		rules: [{
			test: /привет|здравств/i,
			replies: ["Привет, сынок.", "Здравствуй. Ты поел?"]
		}, {
			test: /ел|еда|звон|набер|дач|крыш/i,
			replies: [
				"Позвони матери, она волнуется.",
				"На даче порядок. Ты только не пропадай.",
				"Хорошо. Вечером буду у телефона."
			]
		}],
		any: [
			"Хорошо.",
			"Понял тебя.",
			"Береги себя.",
			"Набери, как сможешь.",
			"Ладно."
		]
	},
	lera: {
		rules: [{
			test: /привет/i,
			replies: ["Привет. Я как раз на главе, которую тебе нельзя.", "Привет. Без спойлеров, обещаю."]
		}, {
			test: /спойл|книг|финал|чай|четверг/i,
			replies: [
				"Молчу про финал. Чай в четверг, в семь.",
				"Дочитывай спокойно. Я подожду с разговором.",
				"Четверг в силе. Возьму ту самую книгу, закладкой наружу не буду."
			]
		}],
		any: [
			"Угу.",
			"Договорились.",
			"Не торопись.",
			"Записала.",
			"Хорошо, до четверга."
		]
	}
};
function pickReply(chatId, text) {
	const bank = BANKS[chatId] ?? GENERIC;
	const pool = bank.rules.find((rule) => rule.test.test(text))?.replies ?? bank.any;
	return pool[Math.floor(Math.random() * pool.length)] ?? "Ок.";
}
var KEY = "nord-messenger-v1";
var replyTimers = /* @__PURE__ */ new Map();
function snapshot(data) {
	return {
		v: 1,
		me: data.me,
		chats: data.chats,
		messages: data.messages,
		drafts: data.drafts,
		activeId: data.activeId
	};
}
function emptyUi() {
	return {
		folder: "all",
		listQuery: "",
		profileOpen: false,
		settingsOpen: false,
		createOpen: false,
		replyToId: null,
		editingId: null,
		editBackup: null,
		typing: {},
		pulseId: null,
		unreadMarker: null,
		threadSearch: "",
		threadSearchOpen: false,
		focusMessageId: null
	};
}
function loadData() {
	const fresh = buildSeed();
	const blank = {
		...fresh,
		drafts: {},
		activeId: null
	};
	if (typeof window === "undefined") return blank;
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return blank;
		const parsed = JSON.parse(raw);
		if (!parsed || parsed.v !== 1 || !parsed.me || !Array.isArray(parsed.chats) || !Array.isArray(parsed.messages)) return blank;
		const activeId = parsed.chats.some((chat) => chat.id === parsed.activeId) ? parsed.activeId ?? null : null;
		return {
			me: {
				name: String(parsed.me.name || fresh.me.name),
				username: String(parsed.me.username || fresh.me.username),
				about: String(parsed.me.about || "")
			},
			chats: parsed.chats,
			messages: parsed.messages,
			drafts: parsed.drafts && typeof parsed.drafts === "object" ? parsed.drafts : {},
			activeId
		};
	} catch {
		return blank;
	}
}
function notify(title, description, action) {
	if (typeof window === "undefined") return;
	import("../_libs/sonner.mjs").then((n) => n.n).then(({ toast }) => {
		toast(title, {
			description,
			action: action ? {
				label: action.label,
				onClick: action.onClick
			} : void 0
		});
	});
}
function clearReplyTimer(chatId) {
	const prev = replyTimers.get(chatId);
	if (prev) window.clearTimeout(prev);
	replyTimers.delete(chatId);
}
var useMessenger = create((set, get) => ({
	...loadData(),
	...emptyUi(),
	setFolder: (folder) => set({ folder }),
	setListQuery: (listQuery) => set({ listQuery }),
	setProfileOpen: (profileOpen) => set({ profileOpen }),
	setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
	setCreateOpen: (createOpen) => set({ createOpen }),
	setThreadSearchOpen: (threadSearchOpen) => set(threadSearchOpen ? { threadSearchOpen } : {
		threadSearchOpen,
		threadSearch: ""
	}),
	setThreadSearch: (threadSearch) => set({ threadSearch }),
	setDraft: (chatId, text) => set((s) => ({ drafts: {
		...s.drafts,
		[chatId]: text.slice(0, 4e3)
	} })),
	setActive: (id) => {
		const s = get();
		let drafts = s.drafts;
		if (s.editingId) {
			const editing = s.messages.find((m) => m.id === s.editingId);
			if (editing) drafts = {
				...drafts,
				[editing.chatId]: s.editBackup ?? ""
			};
		}
		const first = id ? s.messages.find((m) => m.chatId === id && m.senderId !== "me" && m.senderId !== "system" && !m.read) : void 0;
		const needsRead = Boolean(id && s.messages.some((m) => m.chatId === id && m.senderId !== "me" && !m.read));
		set({
			activeId: id,
			drafts,
			replyToId: null,
			editingId: null,
			editBackup: null,
			threadSearch: "",
			threadSearchOpen: false,
			profileOpen: false,
			unreadMarker: first && id ? {
				chatId: id,
				messageId: first.id
			} : null,
			messages: needsRead ? s.messages.map((m) => m.chatId === id && m.senderId !== "me" ? {
				...m,
				read: true
			} : m) : s.messages
		});
	},
	startReply: (messageId) => {
		const message = get().messages.find((m) => m.id === messageId);
		if (!message || message.kind === "system") return;
		if (get().editingId) get().cancelComposerMode();
		set({
			replyToId: messageId,
			editingId: null,
			editBackup: null
		});
	},
	startEdit: (messageId) => {
		const s = get();
		const message = s.messages.find((m) => m.id === messageId);
		if (!message || message.senderId !== "me" || message.kind !== "text") return;
		set({
			editingId: messageId,
			replyToId: null,
			editBackup: s.drafts[message.chatId] ?? "",
			drafts: {
				...s.drafts,
				[message.chatId]: message.text
			}
		});
	},
	cancelComposerMode: () => {
		const s = get();
		if (s.editingId) {
			const message = s.messages.find((m) => m.id === s.editingId);
			if (message) {
				set({
					editingId: null,
					replyToId: null,
					editBackup: null,
					drafts: {
						...s.drafts,
						[message.chatId]: s.editBackup ?? ""
					}
				});
				return;
			}
		}
		set({
			editingId: null,
			replyToId: null,
			editBackup: null
		});
	},
	sendCurrent: (chatId) => {
		const s = get();
		const text = (s.drafts[chatId] ?? "").trim();
		if (!text) return;
		if (s.editingId) {
			set({
				messages: s.messages.map((m) => m.id === s.editingId ? {
					...m,
					text,
					edited: true
				} : m),
				drafts: {
					...s.drafts,
					[chatId]: ""
				},
				editingId: null,
				editBackup: null,
				replyToId: null
			});
			return;
		}
		const message = {
			id: newId("m"),
			chatId,
			senderId: "me",
			text,
			createdAt: Date.now(),
			kind: "text",
			read: false,
			replyToId: s.replyToId ?? void 0,
			reactions: []
		};
		set({
			messages: [...s.messages, message],
			drafts: {
				...s.drafts,
				[chatId]: ""
			},
			replyToId: null,
			pulseId: message.id
		});
		window.setTimeout(() => {
			if (get().pulseId === message.id) set({ pulseId: null });
		}, 400);
		scheduleReply(chatId, text);
	},
	sendSpecial: (chatId, partial) => {
		const s = get();
		if (s.editingId) return;
		const caption = (partial.text ?? s.drafts[chatId] ?? "").trim();
		const message = {
			id: newId("m"),
			chatId,
			senderId: "me",
			text: partial.kind === "text" ? caption : caption,
			createdAt: Date.now(),
			kind: partial.kind,
			read: false,
			replyToId: s.replyToId ?? void 0,
			reactions: [],
			voiceSec: partial.voiceSec,
			photo: partial.photo,
			fileName: partial.fileName,
			fileSize: partial.fileSize
		};
		set({
			messages: [...s.messages, message],
			drafts: {
				...s.drafts,
				[chatId]: ""
			},
			replyToId: null,
			pulseId: message.id
		});
		scheduleReply(chatId, partial.kind === "photo" ? `фото ${caption}` : partial.kind === "voice" ? "послушай голосовое" : partial.kind === "file" ? "смотри файл" : caption);
	},
	toggleReaction: (messageId, emoji) => {
		set({ messages: get().messages.map((m) => {
			if (m.id !== messageId) return m;
			const reactions = [...m.reactions];
			const index = reactions.findIndex((r) => r.emoji === emoji);
			if (index === -1) reactions.push({
				emoji,
				mine: true,
				others: 0
			});
			else if (reactions[index].mine) {
				if (reactions[index].others === 0) reactions.splice(index, 1);
				else reactions[index] = {
					...reactions[index],
					mine: false
				};
			} else reactions[index] = {
				...reactions[index],
				mine: true
			};
			return {
				...m,
				reactions
			};
		}) });
	},
	deleteMessage: (messageId) => {
		const message = get().messages.find((m) => m.id === messageId);
		if (!message) return;
		set({
			messages: get().messages.filter((m) => m.id !== messageId),
			replyToId: get().replyToId === messageId ? null : get().replyToId
		});
		notify("Сообщение удалено", void 0, {
			label: "Вернуть",
			onClick: () => {
				const cur = get().messages;
				if (cur.some((m) => m.id === message.id)) return;
				set({ messages: [...cur, message].sort((a, b) => a.createdAt - b.createdAt) });
			}
		});
	},
	togglePin: (chatId) => set({ chats: get().chats.map((chat) => chat.id === chatId ? {
		...chat,
		pinned: !chat.pinned
	} : chat) }),
	toggleMute: (chatId) => set({ chats: get().chats.map((chat) => chat.id === chatId ? {
		...chat,
		muted: !chat.muted
	} : chat) }),
	updateMe: (patch) => set((s) => ({ me: {
		...s.me,
		...patch
	} })),
	createChat: (name) => {
		const title = name.trim().slice(0, 40);
		if (!title) return;
		const id = newId("c");
		const chat = {
			id,
			kind: "direct",
			title,
			about: "Личный чат",
			gender: "n",
			pinned: false,
			muted: false,
			pattern: patternFrom(id),
			createdAt: Date.now()
		};
		set((s) => ({
			chats: [...s.chats, chat],
			createOpen: false,
			folder: "all",
			listQuery: ""
		}));
		get().setActive(id);
	},
	openDirect: (name, gender) => {
		const title = name.trim();
		if (!title) return;
		const existing = get().chats.find((chat) => chat.kind === "direct" && chat.title === title);
		if (existing) {
			get().setActive(existing.id);
			return;
		}
		const id = newId("c");
		const chat = {
			id,
			kind: "direct",
			title,
			about: "Личный чат",
			gender,
			pinned: false,
			muted: false,
			pattern: patternFrom(id),
			createdAt: Date.now()
		};
		set((s) => ({ chats: [...s.chats, chat] }));
		get().setActive(id);
	},
	saveToSaved: (messageId) => {
		const message = get().messages.find((m) => m.id === messageId);
		if (!message || message.kind === "system") return;
		if (message.chatId === "saved") {
			notify("Уже в избранном");
			return;
		}
		const copy = {
			...message,
			id: newId("m"),
			chatId: "saved",
			senderId: "me",
			createdAt: Date.now(),
			read: true,
			replyToId: void 0,
			reactions: []
		};
		set({ messages: [...get().messages, copy] });
		notify("В избранном");
	},
	focusMessage: (messageId) => set({
		focusMessageId: messageId,
		profileOpen: false
	}),
	clearFocus: () => set({ focusMessageId: null }),
	resetDemo: () => {
		for (const timer of replyTimers.values()) window.clearTimeout(timer);
		replyTimers.clear();
		set({
			...buildSeed(),
			drafts: {},
			activeId: null,
			...emptyUi()
		});
		notify("Демо-чаты возвращены");
	}
}));
function scheduleReply(chatId, userText) {
	const chat = useMessenger.getState().chats.find((item) => item.id === chatId);
	if (!chat || chat.kind === "saved" || chat.kind === "channel") return;
	clearReplyTimer(chatId);
	let senderId = chatId;
	let label = "печатает…";
	if (chat.kind === "group" && chat.members && chat.members.length > 0) {
		const member = chat.members[Math.floor(Math.random() * chat.members.length)];
		senderId = member.id;
		label = `${member.name.split(" ")[0]} печатает…`;
	}
	useMessenger.setState((s) => ({ typing: {
		...s.typing,
		[chatId]: label
	} }));
	const delay = 900 + Math.random() * 1200;
	const timer = window.setTimeout(() => {
		replyTimers.delete(chatId);
		const state = useMessenger.getState();
		const current = state.chats.find((item) => item.id === chatId);
		if (!current) return;
		const text = pickReply(chatId, userText);
		const message = {
			id: newId("m"),
			chatId,
			senderId,
			text,
			createdAt: Date.now(),
			kind: "text",
			read: state.activeId === chatId,
			reactions: []
		};
		const typing = { ...state.typing };
		delete typing[chatId];
		useMessenger.setState({
			messages: [...state.messages.map((item) => item.chatId === chatId && item.senderId === "me" ? {
				...item,
				read: true
			} : item), message],
			typing,
			pulseId: message.id
		});
		window.setTimeout(() => {
			if (useMessenger.getState().pulseId === message.id) useMessenger.setState({ pulseId: null });
		}, 400);
		if (state.activeId !== chatId && !current.muted) notify(current.title, text.slice(0, 140));
	}, delay);
	replyTimers.set(chatId, timer);
}
if (typeof window !== "undefined") useMessenger.subscribe((state, prev) => {
	if (state.me === prev.me && state.chats === prev.chats && state.messages === prev.messages && state.drafts === prev.drafts && state.activeId === prev.activeId) return;
	try {
		localStorage.setItem(KEY, JSON.stringify(snapshot(state)));
	} catch {}
});
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var SIZE = {
	sm: "size-8 text-xs",
	md: "size-12 text-sm",
	lg: "size-11 text-sm",
	xl: "size-24 text-2xl"
};
function PatternMark({ pattern }) {
	const stroke = "var(--color-accent)";
	if (pattern === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 40 40",
		className: "absolute inset-0 h-full w-full",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "20",
			cy: "20",
			r: "15",
			fill: "none",
			stroke,
			strokeWidth: "1.2",
			opacity: "0.55"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "20",
			cy: "20",
			r: "7",
			fill: "none",
			stroke,
			strokeWidth: "1.2",
			opacity: "0.35"
		})]
	});
	if (pattern === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 40 40",
		className: "absolute inset-0 h-full w-full",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M0 28 L40 8",
				stroke,
				strokeWidth: "1.4",
				opacity: "0.45"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M0 18 L40 -2",
				stroke,
				strokeWidth: "1.4",
				opacity: "0.3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M0 38 L40 18",
				stroke,
				strokeWidth: "1.4",
				opacity: "0.3"
			})
		]
	});
	if (pattern === 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 40 40",
		className: "absolute inset-0 h-full w-full",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "14",
				r: "2",
				fill: stroke,
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "24",
				cy: "12",
				r: "1.4",
				fill: stroke,
				opacity: "0.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "28",
				cy: "24",
				r: "2.2",
				fill: stroke,
				opacity: "0.45"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "14",
				cy: "28",
				r: "1.5",
				fill: stroke,
				opacity: "0.35"
			})
		]
	});
	if (pattern === 3) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 40 40",
		className: "absolute inset-0 h-full w-full",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M20 6 L34 20 L20 34 L6 20 Z",
			fill: "none",
			stroke,
			strokeWidth: "1.2",
			opacity: "0.5"
		})
	});
	if (pattern === 4) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 40 40",
		className: "absolute inset-0 h-full w-full",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 32 V12",
				stroke,
				strokeWidth: "1.3",
				opacity: "0.45"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 32 V18",
				stroke,
				strokeWidth: "1.3",
				opacity: "0.35"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M24 32 V10",
				stroke,
				strokeWidth: "1.3",
				opacity: "0.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 32 V20",
				stroke,
				strokeWidth: "1.3",
				opacity: "0.3"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 40 40",
		className: "absolute inset-0 h-full w-full",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "20",
			cy: "20",
			r: "16",
			fill: "none",
			stroke,
			strokeWidth: "1.2",
			opacity: "0.35"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M20 8 V20 L30 24",
			fill: "none",
			stroke,
			strokeWidth: "1.4",
			opacity: "0.7"
		})]
	});
}
function Avatar({ name, pattern, size = "md", online, kind, badge = true }) {
	const mark = kind === "group" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3" }) : kind === "channel" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "size-3" }) : kind === "saved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-3" }) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-raised text-fg", SIZE[size]),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatternMark, { pattern }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "relative font-display tracking-wide",
				children: kind === "saved" ? "" : initials(name)
			}),
			badge && online && kind !== "group" && kind !== "channel" && kind !== "saved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-0 bottom-0 size-3 rounded-full bg-accent ring-2 ring-panel" }),
			badge && mark && size !== "sm" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute -right-0.5 -bottom-0.5 grid size-5 place-items-center rounded-full bg-accent text-accent-ink",
				children: mark
			})
		]
	});
}
function NordMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "9",
				fill: "var(--color-accent)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "17",
				r: "7.2",
				fill: "none",
				stroke: "var(--color-accent-ink)",
				strokeWidth: "1.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 7.4l2.3 9.1-2.3-1.7-2.3 1.7z",
				fill: "var(--color-accent-ink)"
			})
		]
	});
}
function IconButton({ label, className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		title: label,
		className: cn("tap grid size-11 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-raised hover:text-fg", className),
		...props,
		children
	});
}
var FOLDERS = [
	{
		id: "all",
		label: "Все",
		icon: MessageCircle
	},
	{
		id: "direct",
		label: "Личные",
		icon: User
	},
	{
		id: "group",
		label: "Группы",
		icon: Users
	},
	{
		id: "channel",
		label: "Каналы",
		icon: Megaphone
	},
	{
		id: "unread",
		label: "Непрочитанные",
		icon: Mail
	}
];
function Rail() {
	const folder = useMessenger((s) => s.folder);
	const setFolder = useMessenger((s) => s.setFolder);
	const setActive = useMessenger((s) => s.setActive);
	const setSettingsOpen = useMessenger((s) => s.setSettingsOpen);
	const chats = useMessenger((s) => s.chats);
	const messages = useMessenger((s) => s.messages);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "hidden w-16 shrink-0 flex-col items-center gap-1 border-r border-line bg-panel py-3 lg:flex",
		"aria-label": "Папки",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "tap mb-2 grid size-11 place-items-center rounded-full",
				"aria-label": "Все чаты",
				onClick: () => {
					setFolder("all");
					setActive(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NordMark, { className: "size-8" })
			}),
			FOLDERS.map((item) => {
				const Icon = item.icon;
				const count = folderUnread(item.id, chats, messages);
				const active = folder === item.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					title: item.label,
					"aria-label": item.label,
					"aria-pressed": active,
					onClick: () => setFolder(item.id),
					className: cn("tap relative grid size-11 place-items-center rounded-full transition-colors", active ? "bg-raised text-accent" : "text-muted hover:bg-raised hover:text-fg"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1.5 right-1.5 size-1.5 rounded-full bg-accent" })]
				}, item.id);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				title: "Избранное",
				"aria-label": "Избранное",
				onClick: () => setActive("saved"),
				className: "tap grid size-11 place-items-center rounded-full text-muted hover:bg-raised hover:text-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
					label: "Настройки",
					onClick: () => setSettingsOpen(true),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-5" })
				})
			})
		]
	});
}
function ChatList() {
	const chats = useMessenger((s) => s.chats);
	const messages = useMessenger((s) => s.messages);
	const folder = useMessenger((s) => s.folder);
	const setFolder = useMessenger((s) => s.setFolder);
	const query = useMessenger((s) => s.listQuery);
	const setQuery = useMessenger((s) => s.setListQuery);
	const activeId = useMessenger((s) => s.activeId);
	const setActive = useMessenger((s) => s.setActive);
	const drafts = useMessenger((s) => s.drafts);
	const setCreateOpen = useMessenger((s) => s.setCreateOpen);
	const setSettingsOpen = useMessenger((s) => s.setSettingsOpen);
	const searchRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				searchRef.current?.focus();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	const ordered = (0, import_react.useMemo)(() => sortChats(chats, messages), [chats, messages]);
	const q = query.trim().toLowerCase();
	const filtered = ordered.filter((chat) => {
		const unread = chatUnread(chat.id, messages);
		if (!inFolder(chat, folder, unread)) return false;
		if (!q) return true;
		const last = lastMessage(chat.id, messages);
		return [
			chat.title,
			chat.username ?? "",
			chat.about,
			last ? messagePreview(last) : ""
		].join(" ").toLowerCase().includes(q);
	});
	const online = ordered.filter((chat) => chat.kind === "direct" && chat.online);
	const showPins = folder === "all" && !q && filtered.some((chat) => chat.pinned);
	let pinHeader = false;
	let restHeader = false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("flex min-h-0 w-full min-w-0 flex-col bg-panel lg:w-96 lg:shrink-0 lg:border-r lg:border-line", activeId && "hidden lg:flex"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-1 px-2 pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "px-2 font-display text-xl tracking-widest",
					children: "NORD"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						label: "Настройки",
						className: "lg:hidden",
						onClick: () => setSettingsOpen(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						label: "Новый чат",
						onClick: () => setCreateOpen(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "size-5" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-3 py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: searchRef,
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Поиск",
							"aria-label": "Поиск чатов",
							className: "h-11 w-full rounded-full border border-line bg-ink pr-11 pl-10 text-base text-fg transition-colors placeholder:text-muted lg:text-sm"
						}),
						query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Очистить поиск",
							onClick: () => setQuery(""),
							className: "tap absolute top-1/2 right-1 grid size-9 -translate-y-1/2 place-items-center rounded-full text-muted hover:text-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto px-3 pb-2 lg:hidden",
				children: FOLDERS.map((item) => {
					const count = folderUnread(item.id, chats, messages);
					const active = folder === item.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setFolder(item.id),
						className: cn("tap h-11 shrink-0 rounded-full px-4 text-sm font-medium", active ? "bg-accent text-accent-ink" : "bg-raised text-muted"),
						children: [item.label, count > 0 ? ` ${count}` : ""]
					}, item.id);
				})
			}),
			online.length > 0 && !q && folder === "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scroll-thin flex gap-3 overflow-x-auto px-4 pb-3",
				children: online.map((chat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setActive(chat.id),
					className: "tap flex w-16 shrink-0 flex-col items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
						name: chat.title,
						pattern: chat.pattern,
						online: true,
						kind: chat.kind
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-full truncate text-center text-xs text-muted",
						children: chat.title.split(" ")[0]
					})]
				}, chat.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "scroll-thin min-h-0 flex-1 overflow-y-auto",
				role: "list",
				"aria-label": "Чаты",
				children: [filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-4 py-10 text-center text-sm text-muted",
					children: q ? "Никого не нашли" : "В этой папке пока пусто"
				}), filtered.map((chat) => {
					const unread = chatUnread(chat.id, messages);
					const last = lastMessage(chat.id, messages);
					const draft = (drafts[chat.id] ?? "").trim();
					const active = chat.id === activeId;
					let header = null;
					if (showPins && chat.pinned && !pinHeader) {
						pinHeader = true;
						header = "Закреплённые";
					} else if (showPins && !chat.pinned && !restHeader) {
						restHeader = true;
						header = "Все чаты";
					}
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [header && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-4 pt-3 pb-1 text-xs text-muted",
						children: header
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "listitem",
						"aria-current": active ? "true" : void 0,
						onClick: () => setActive(chat.id),
						className: cn("relative flex w-full items-center gap-3 px-3 py-2 text-left", active ? "bg-raised" : "hover:bg-raised/70"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute top-2 bottom-2 left-0 w-0.5 rounded-full", active ? "bg-accent" : "bg-transparent") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
								name: chat.title,
								pattern: chat.pattern,
								online: chat.online,
								kind: chat.kind
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-baseline gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("truncate", unread ? "font-semibold" : "font-medium"),
										children: chat.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: cn("ml-auto flex shrink-0 items-center gap-1 text-xs tabular-nums", unread ? "text-accent" : "text-muted"),
										children: [chat.muted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellOff, { className: "size-3" }), last ? listTime(last.createdAt) : ""]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-0.5 flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("flex min-w-0 flex-1 items-center gap-1 text-sm", unread ? "text-fg" : "text-muted"),
											children: draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "truncate text-accent",
												children: ["Черновик: ", draft]
											}) : last ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
												last.kind === "voice" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-3.5 shrink-0" }),
												last.kind === "photo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-3.5 shrink-0" }),
												last.kind === "file" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5 shrink-0" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "truncate",
													children: [previewPrefix(chat, last), messagePreview(last)]
												})
											] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate",
												children: "Нет сообщений"
											})
										}),
										unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("grid h-5 min-w-5 place-items-center rounded-full px-1 text-xs font-semibold tabular-nums", chat.muted ? "bg-line text-muted" : "bg-accent text-accent-ink"),
											children: unread > 99 ? "99+" : unread
										}),
										chat.pinned && unread === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { className: "size-3 shrink-0 text-muted" })
									]
								})]
							})
						]
					})] }, chat.id);
				})]
			})
		]
	});
}
function ProfilePanel({ chat }) {
	const messages = useMessenger((s) => s.messages);
	const setProfileOpen = useMessenger((s) => s.setProfileOpen);
	const togglePin = useMessenger((s) => s.togglePin);
	const toggleMute = useMessenger((s) => s.toggleMute);
	const setThreadSearchOpen = useMessenger((s) => s.setThreadSearchOpen);
	const focusMessage = useMessenger((s) => s.focusMessage);
	const openDirect = useMessenger((s) => s.openDirect);
	const photos = messages.filter((message) => message.chatId === chat.id && message.kind === "photo" && message.photo);
	const notes = messages.filter((message) => message.chatId === chat.id && message.kind !== "system").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "absolute inset-0 z-30 flex min-h-0 flex-col bg-panel lg:static lg:w-80 lg:shrink-0 lg:border-l lg:border-line",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center gap-1 px-1 py-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
				label: "Назад",
				onClick: () => setProfileOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: "Профиль"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "scroll-thin min-h-0 flex-1 overflow-y-auto px-5 pb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center pt-4 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
							name: chat.title,
							pattern: chat.pattern,
							size: "xl",
							online: chat.online,
							kind: chat.kind
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 text-xl font-semibold text-balance",
							children: chat.title
						}),
						chat.username && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-accent",
							children: ["@", chat.username]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-xs text-sm leading-relaxed text-muted text-pretty",
							children: chat.about
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => togglePin(chat.id),
						className: "tap flex h-11 items-center gap-2 rounded-full bg-raised px-4 text-sm",
						children: [chat.pinned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { className: "size-4" }), chat.pinned ? "Открепить" : "Закрепить"]
					}), chat.kind !== "saved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => toggleMute(chat.id),
						className: "tap flex h-11 items-center gap-2 rounded-full bg-raised px-4 text-sm",
						children: [chat.muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellOff, { className: "size-4" }), chat.muted ? "Звук" : "Тихо"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setProfileOpen(false);
						setThreadSearchOpen(true);
					},
					className: "mt-3 h-11 w-full rounded-full border border-line text-sm text-fg hover:bg-raised",
					children: "Искать в переписке"
				}),
				chat.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Телефон"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm tabular-nums",
						children: chat.phone
					})]
				}),
				chat.kind === "saved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-sm text-muted",
					children: [
						notes,
						" ",
						plural(notes, "заметка", "заметки", "заметок")
					]
				}),
				chat.kind === "group" && chat.members && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Участники"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2",
						children: chat.members.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => openDirect(member.name, member.gender),
							className: "flex h-12 w-full items-center gap-3 rounded-xl px-1 text-left hover:bg-raised",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-9 place-items-center rounded-full bg-raised font-display text-xs",
								children: initials(member.name)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-sm",
								children: member.name
							})]
						}) }, member.id))
					})]
				}),
				photos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Фото"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid grid-cols-3 gap-1",
						children: photos.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => focusMessage(message.id),
							className: "overflow-hidden rounded-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: message.photo,
								alt: message.text || "Фото",
								className: "aspect-square w-full object-cover"
							})
						}, message.id))
					})]
				})
			]
		})]
	});
}
function CreateDialog() {
	const open = useMessenger((s) => s.createOpen);
	const setOpen = useMessenger((s) => s.setCreateOpen);
	const createChat = useMessenger((s) => s.createChat);
	const [name, setName] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (open) setName("");
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "pop fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display text-lg tracking-wide",
						children: "Новый чат"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Закрыть",
							className: "tap ml-auto grid size-11 place-items-center rounded-full text-muted hover:bg-raised hover:text-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "mt-1 text-sm text-muted",
					children: "Напишите человеку. Ответ придёт прямо здесь."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-4",
					onSubmit: (event) => {
						event.preventDefault();
						createChat(name);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted",
							htmlFor: "new-chat-name",
							children: "Имя"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "new-chat-name",
							value: name,
							onChange: (event) => setName(event.target.value),
							autoFocus: true,
							maxLength: 40,
							placeholder: "Например, Ника",
							className: "mt-1 h-11 w-full rounded-xl border border-line bg-ink px-3 text-base outline-none placeholder:text-muted"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: !name.trim(),
							className: "tap mt-4 h-11 w-full rounded-full bg-accent font-medium text-accent-ink disabled:opacity-40",
							children: "Начать переписку"
						})
					]
				})
			]
		})] })
	});
}
function SettingsDialog() {
	const open = useMessenger((s) => s.settingsOpen);
	const setOpen = useMessenger((s) => s.setSettingsOpen);
	const me = useMessenger((s) => s.me);
	const updateMe = useMessenger((s) => s.updateMe);
	const resetDemo = useMessenger((s) => s.resetDemo);
	const [name, setName] = (0, import_react.useState)(me.name);
	const [username, setUsername] = (0, import_react.useState)(me.username);
	const [about, setAbout] = (0, import_react.useState)(me.about);
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setName(me.name);
		setUsername(me.username);
		setAbout(me.about);
		setConfirm(false);
	}, [open, me]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "pop fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display text-lg tracking-wide",
						children: "Вы"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Закрыть",
							className: "tap ml-auto grid size-11 place-items-center rounded-full text-muted hover:bg-raised hover:text-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "mt-1 text-sm leading-relaxed text-muted text-pretty",
					children: "Так вас видно в чатах. Переписка хранится только в этом браузере — это не Telegram и не чужой аккаунт."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-4 space-y-3",
					onSubmit: (event) => {
						event.preventDefault();
						updateMe({
							name: name.trim().slice(0, 40) || me.name,
							username: username.replace(/^@/, "").replace(/\s/g, "").slice(0, 24) || me.username,
							about: about.trim().slice(0, 140)
						});
						setOpen(false);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs text-muted",
							children: ["Имя", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: name,
								onChange: (event) => setName(event.target.value),
								maxLength: 40,
								className: "mt-1 h-11 w-full rounded-xl border border-line bg-ink px-3 text-base text-fg outline-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs text-muted",
							children: ["Имя пользователя", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: username,
								onChange: (event) => setUsername(event.target.value),
								maxLength: 24,
								className: "mt-1 h-11 w-full rounded-xl border border-line bg-ink px-3 text-base text-fg outline-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs text-muted",
							children: ["О себе", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: about,
								onChange: (event) => setAbout(event.target.value),
								maxLength: 140,
								rows: 3,
								className: "mt-1 w-full resize-none rounded-xl border border-line bg-ink px-3 py-2 text-base text-fg outline-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "tap h-11 w-full rounded-full bg-accent font-medium text-accent-ink",
							children: "Сохранить"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						if (!confirm) {
							setConfirm(true);
							return;
						}
						resetDemo();
						setOpen(false);
					},
					className: "mt-3 h-11 w-full rounded-full text-sm text-muted hover:bg-raised hover:text-fg",
					children: confirm ? "Точно вернуть демо-чаты" : "Вернуть демо-чаты"
				})
			]
		})] })
	});
}
function useClient() {
	return (0, import_react.useSyncExternalStore)(() => () => {}, () => true, () => false);
}
function useDesktop() {
	return (0, import_react.useSyncExternalStore)((onChange) => {
		const mq = window.matchMedia("(min-width: 1024px)");
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, () => window.matchMedia("(min-width: 1024px)").matches, () => false);
}
function sameCluster(list, index, dir) {
	const a = list[index];
	const b = list[index + dir];
	if (!a || !b) return false;
	if (a.kind === "system" || b.kind === "system") return false;
	if (a.senderId !== b.senderId) return false;
	if (!isSameDay(a.createdAt, b.createdAt)) return false;
	return Math.abs(a.createdAt - b.createdAt) < 3e5;
}
function ChatPhoto({ src, alt }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	if (failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-1 grid h-36 place-items-center rounded-xl bg-ink px-3 text-center text-sm text-muted",
		children: alt
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt,
		className: "mb-1 max-h-64 w-full rounded-xl object-cover",
		onError: () => setFailed(true)
	});
}
function VoiceNote({ id, seconds, text, mine }) {
	const bars = (0, import_react.useMemo)(() => waveBars(id), [id]);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		const started = performance.now();
		let frame = 0;
		const loop = (now) => {
			const ratio = Math.min(1, (now - started) / (seconds * 1e3));
			setProgress(ratio);
			if (ratio < 1) frame = requestAnimationFrame(loop);
			else setPlaying(false);
		};
		frame = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(frame);
	}, [playing, seconds]);
	const shown = playing ? Math.round(progress * seconds) : seconds;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-56",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": playing ? "Пауза" : "Слушать",
					onClick: (event) => {
						event.stopPropagation();
						if (playing) {
							setPlaying(false);
							return;
						}
						setProgress(0);
						setPlaying(true);
					},
					className: cn("tap grid size-11 shrink-0 place-items-center rounded-full", mine ? "bg-ink/40 text-fg" : "bg-accent text-accent-ink"),
					children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-8 flex-1 items-center gap-0.5",
					"aria-hidden": "true",
					children: bars.map((height, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("w-0.5 rounded-full", index / bars.length < progress ? "bg-accent" : "bg-fg/35"),
						style: { height: `${height}%` }
					}, index))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs tabular-nums text-fg/70",
					children: [
						Math.floor(shown / 60),
						":",
						String(shown % 60).padStart(2, "0")
					]
				})
			]
		}), text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm leading-relaxed",
			children: text
		})]
	});
}
function EmptyThread() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "thread-bg flex min-h-0 flex-1 flex-col items-center justify-center px-6 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl tracking-widest",
			children: "NORD"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-sm text-sm leading-relaxed text-muted text-pretty",
			children: "Выберите чат или начните новый. Личные переписки, группы и каналы остаются на этом устройстве."
		})]
	});
}
function Thread({ chat }) {
	const messages = useMessenger((s) => s.messages);
	const me = useMessenger((s) => s.me);
	const drafts = useMessenger((s) => s.drafts);
	const replyToId = useMessenger((s) => s.replyToId);
	const editingId = useMessenger((s) => s.editingId);
	const typing = useMessenger((s) => s.typing[chat.id]);
	const pulseId = useMessenger((s) => s.pulseId);
	const marker = useMessenger((s) => s.unreadMarker);
	const threadSearch = useMessenger((s) => s.threadSearch);
	const threadSearchOpen = useMessenger((s) => s.threadSearchOpen);
	const focusMessageId = useMessenger((s) => s.focusMessageId);
	const setActive = useMessenger((s) => s.setActive);
	const setProfileOpen = useMessenger((s) => s.setProfileOpen);
	const setDraft = useMessenger((s) => s.setDraft);
	const sendCurrent = useMessenger((s) => s.sendCurrent);
	const sendSpecial = useMessenger((s) => s.sendSpecial);
	const startReply = useMessenger((s) => s.startReply);
	const startEdit = useMessenger((s) => s.startEdit);
	const cancelComposerMode = useMessenger((s) => s.cancelComposerMode);
	const toggleReaction = useMessenger((s) => s.toggleReaction);
	const deleteMessage = useMessenger((s) => s.deleteMessage);
	const saveToSaved = useMessenger((s) => s.saveToSaved);
	const togglePin = useMessenger((s) => s.togglePin);
	const toggleMute = useMessenger((s) => s.toggleMute);
	const setThreadSearch = useMessenger((s) => s.setThreadSearch);
	const setThreadSearchOpen = useMessenger((s) => s.setThreadSearchOpen);
	const clearFocus = useMessenger((s) => s.clearFocus);
	const desktop = useDesktop();
	const draft = drafts[chat.id] ?? "";
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [recording, setRecording] = (0, import_react.useState)(false);
	const [seconds, setSeconds] = (0, import_react.useState)(0);
	const [showJump, setShowJump] = (0, import_react.useState)(false);
	const scrollerRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	const stickRef = (0, import_react.useRef)(true);
	const shown = (0, import_react.useMemo)(() => {
		const base = messages.filter((message) => message.chatId === chat.id).sort((a, b) => a.createdAt - b.createdAt);
		const q = threadSearch.trim().toLowerCase();
		if (!q) return base;
		return base.filter((message) => {
			const who = senderName(chat, message.senderId, me.name).toLowerCase();
			return messagePreview(message).toLowerCase().includes(q) || message.text.toLowerCase().includes(q) || who.includes(q);
		});
	}, [
		messages,
		chat,
		threadSearch,
		me.name
	]);
	const lastId = shown[shown.length - 1]?.id;
	const status = presence(chat);
	(0, import_react.useEffect)(() => {
		setSelectedId(null);
		setRecording(false);
		setSeconds(0);
		stickRef.current = true;
	}, [chat.id]);
	(0, import_react.useEffect)(() => {
		if (!desktop) return;
		inputRef.current?.focus();
	}, [chat.id, desktop]);
	(0, import_react.useEffect)(() => {
		const el = inputRef.current;
		if (!el) return;
		el.style.height = "0px";
		el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
	}, [
		draft,
		chat.id,
		recording
	]);
	(0, import_react.useEffect)(() => {
		if (!recording) return;
		const id = window.setInterval(() => setSeconds((value) => value + 1), 1e3);
		return () => window.clearInterval(id);
	}, [recording]);
	(0, import_react.useEffect)(() => {
		if (recording && seconds >= 60) {
			const voiceSec = Math.max(1, seconds);
			setRecording(false);
			setSeconds(0);
			sendSpecial(chat.id, {
				kind: "voice",
				voiceSec
			});
		}
	}, [
		recording,
		seconds,
		chat.id,
		sendSpecial
	]);
	(0, import_react.useLayoutEffect)(() => {
		const el = scrollerRef.current;
		if (!el) return;
		if (threadSearch.trim()) {
			el.scrollTop = 0;
			setShowJump(false);
			return;
		}
		const last = shown[shown.length - 1];
		if (stickRef.current || last?.senderId === "me") {
			el.scrollTop = el.scrollHeight;
			stickRef.current = true;
			setShowJump(false);
			return;
		}
		setShowJump(el.scrollHeight - el.scrollTop - el.clientHeight > 140);
	}, [
		chat.id,
		shown.length,
		lastId,
		threadSearch,
		typing,
		shown
	]);
	(0, import_react.useEffect)(() => {
		if (!focusMessageId) return;
		document.querySelector(`[data-mid="${CSS.escape(focusMessageId)}"]`)?.scrollIntoView({ block: "center" });
		clearFocus();
	}, [focusMessageId, clearFocus]);
	const selected = shown.find((message) => message.id === selectedId) ?? null;
	const reply = messages.find((message) => message.id === replyToId && message.chatId === chat.id);
	const editing = messages.find((message) => message.id === editingId && message.chatId === chat.id);
	function sendText() {
		sendCurrent(chat.id);
		setSelectedId(null);
	}
	function finishVoice() {
		const voiceSec = Math.max(1, seconds);
		setRecording(false);
		setSeconds(0);
		sendSpecial(chat.id, {
			kind: "voice",
			voiceSec
		});
	}
	function appendEmoji(emoji) {
		const el = inputRef.current;
		const start = el?.selectionStart ?? draft.length;
		const end = el?.selectionEnd ?? draft.length;
		const next = `${draft.slice(0, start)}${emoji}${draft.slice(end)}`.slice(0, 4e3);
		setDraft(chat.id, next);
		requestAnimationFrame(() => {
			el?.focus();
			const pos = start + emoji.length;
			el?.setSelectionRange(pos, pos);
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 min-w-0 flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-1 border-b border-line bg-panel px-1 py-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						label: "К чатам",
						className: "lg:hidden",
						onClick: () => setActive(null),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setProfileOpen(true),
						className: "flex min-w-0 flex-1 items-center gap-2 rounded-xl px-1 py-1 text-left hover:bg-raised",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
							name: chat.title,
							pattern: chat.pattern,
							size: "lg",
							online: chat.online,
							kind: chat.kind
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate font-medium",
								children: chat.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("block truncate text-xs", typing || status.live ? "text-accent" : "text-muted"),
								children: typing ?? status.label
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						label: "Поиск в чате",
						onClick: () => setThreadSearchOpen(!threadSearchOpen),
						className: threadSearchOpen ? "text-accent" : void 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
							label: "Ещё",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-5" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						align: "end",
						sideOffset: 6,
						className: "pop z-50 w-56 p-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								className: "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-3 text-sm outline-none data-[highlighted]:bg-raised",
								onSelect: () => setProfileOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-4" }), " Профиль"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								className: "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-3 text-sm outline-none data-[highlighted]:bg-raised",
								onSelect: () => togglePin(chat.id),
								children: [chat.pinned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { className: "size-4" }), chat.pinned ? "Открепить" : "Закрепить"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								className: "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-3 text-sm outline-none data-[highlighted]:bg-raised",
								onSelect: () => toggleMute(chat.id),
								children: [chat.muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellOff, { className: "size-4" }), chat.muted ? "Включить уведомления" : "Без звука"]
							})
						]
					}) })] })
				]
			}),
			threadSearchOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-line bg-panel px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					autoFocus: true,
					value: threadSearch,
					onChange: (event) => setThreadSearch(event.target.value),
					placeholder: "Поиск в чате",
					"aria-label": "Поиск в чате",
					className: "h-11 w-full rounded-full border border-line bg-ink px-4 text-base outline-none placeholder:text-muted"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-2 pt-1 text-xs text-muted tabular-nums",
					children: threadSearch.trim() ? `${shown.length} совп.` : "Ищите по тексту"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scrollerRef,
				className: "thread-bg scroll-thin relative min-h-0 flex-1 overflow-y-auto px-3 py-3",
				onScroll: (event) => {
					const el = event.currentTarget;
					const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
					stickRef.current = distance < 140;
					setShowJump(distance > 140);
				},
				children: [
					shown.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-16 text-center text-sm text-muted",
						children: threadSearch.trim() ? "Ничего не найдено" : "Напишите первое сообщение"
					}),
					shown.map((message, index) => {
						if (message.kind === "system") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "my-3 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-panel px-3 py-1 text-xs text-muted",
								children: message.text
							})
						}, message.id);
						const mine = message.senderId === "me";
						const prev = sameCluster(shown, index, -1);
						const next = sameCluster(shown, index, 1);
						const showDate = index === 0 || !isSameDay(shown[index - 1].createdAt, message.createdAt);
						const quoted = message.replyToId ? messages.find((item) => item.id === message.replyToId) : void 0;
						const grouped = chat.kind === "group" && !mine;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-mid": message.id,
							className: pulseId === message.id ? "rise" : void 0,
							children: [
								marker?.chatId === chat.id && marker.messageId === message.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "my-3 flex items-center gap-3 text-xs text-accent",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-accent/40" }),
										"Непрочитанные",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-accent/40" })
									]
								}),
								showDate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "my-3 flex justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-panel px-3 py-1 text-xs text-muted",
										children: dayLabel(message.createdAt)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("mb-1 flex", mine ? "justify-end" : "justify-start", next ? "mb-0.5" : "mb-2"),
									children: [grouped && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mr-2 w-8 shrink-0 self-end",
										children: !next && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
											name: senderName(chat, message.senderId, me.name),
											pattern: patternFrom(message.senderId),
											size: "sm",
											badge: false
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: cn("min-w-0", chat.kind === "channel" ? "bubble-wide" : "bubble"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											onClick: () => setSelectedId((current) => current === message.id ? null : message.id),
											onDoubleClick: () => startReply(message.id),
											className: cn("cursor-pointer px-3 py-2 text-fg", mine ? "bg-out" : "bg-raised", "rounded-2xl", mine && next && "rounded-br-md", mine && prev && "rounded-tr-md", !mine && next && "rounded-bl-md", !mine && prev && "rounded-tl-md", selectedId === message.id && "ring-2 ring-accent"),
											children: [
												grouped && !prev && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mb-0.5 text-xs font-medium text-accent",
													children: senderName(chat, message.senderId, me.name)
												}),
												message.replyToId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mb-1 border-l-2 border-accent pl-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs font-medium text-accent",
														children: quoted ? senderName(chat, quoted.senderId, me.name) : "Сообщение"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "truncate text-xs text-fg/70",
														children: quoted ? messagePreview(quoted) : "Удалено"
													})]
												}),
												message.kind === "photo" && message.photo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatPhoto, {
													src: message.photo,
													alt: message.text || "Фото"
												}),
												message.kind === "file" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mb-1 flex items-center gap-2 rounded-xl bg-ink/45 px-2 py-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "grid size-11 place-items-center rounded-full bg-accent/15 text-accent",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-5" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "min-w-0",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "block truncate text-sm",
															children: message.fileName
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "block text-xs text-fg/70",
															children: message.fileSize
														})]
													})]
												}),
												message.kind === "voice" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceNote, {
													id: message.id,
													seconds: message.voiceSec ?? 1,
													text: message.text,
													mine
												}) : message.kind !== "file" && message.text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm leading-relaxed wrap-break-word whitespace-pre-wrap",
													children: message.text
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "mt-1 flex items-center justify-end gap-1 text-xs text-fg/70 tabular-nums",
													children: [
														message.edited && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ред." }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: clock(message.createdAt) }),
														mine && (message.read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "size-3.5 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }))
													]
												})
											]
										}), message.reactions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: cn("mt-1 flex flex-wrap gap-1", mine && "justify-end"),
											children: message.reactions.map((reaction) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => toggleReaction(message.id, reaction.emoji),
												className: cn("rounded-full px-2 py-1 text-xs", reaction.mine ? "bg-accent/20 text-fg" : "bg-panel text-muted"),
												children: [
													reaction.emoji,
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "tabular-nums",
														children: reaction.others + (reaction.mine ? 1 : 0)
													})
												]
											}, reaction.emoji))
										})]
									})]
								})
							]
						}, message.id);
					}),
					typing && !threadSearch.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 px-1 py-1 text-xs text-accent",
						"aria-live": "polite",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex gap-1",
							"aria-hidden": "true",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "typing-dot" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "typing-dot d2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "typing-dot d3" })
							]
						}), typing]
					})
				]
			}),
			showJump && !threadSearch.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Вниз",
				onClick: () => {
					const el = scrollerRef.current;
					if (!el) return;
					stickRef.current = true;
					el.scrollTop = el.scrollHeight;
					setShowJump(false);
				},
				className: "tap absolute right-4 bottom-28 z-10 grid size-11 place-items-center rounded-full border border-line bg-panel text-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-5" })
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "scroll-thin flex items-center gap-1 overflow-x-auto border-t border-line bg-panel px-2 py-1",
				children: [
					REACTIONS.map((emoji) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": `Реакция ${emoji}`,
						className: "tap grid size-11 shrink-0 place-items-center rounded-full text-lg hover:bg-raised",
						onClick: () => toggleReaction(selected.id, emoji),
						children: emoji
					}, emoji)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mx-1 h-6 w-px shrink-0 bg-line" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						label: "Ответить",
						onClick: () => startReply(selected.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reply, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						label: "Скопировать",
						onClick: () => {
							const text = selected.text || messagePreview(selected);
							navigator.clipboard.writeText(text).then(() => notify("Скопировано"), () => notify("Не удалось скопировать"));
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-5" })
					}),
					selected.senderId === "me" && selected.kind === "text" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						label: "Изменить",
						onClick: () => startEdit(selected.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-5" })
					}),
					chat.kind !== "saved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						label: "В избранное",
						onClick: () => saveToSaved(selected.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						label: "Удалить",
						onClick: () => {
							deleteMessage(selected.id);
							setSelectedId(null);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-5" })
					})
				]
			}),
			chat.kind === "channel" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "safe-bottom border-t border-line bg-panel px-4 py-4 text-center text-sm text-muted",
				children: "Канал только для чтения · вы подписаны"
			}) : recording ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "safe-bottom flex items-center gap-2 border-t border-line bg-panel px-2 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						label: "Отменить запись",
						onClick: () => {
							setRecording(false);
							setSeconds(0);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 flex-1 items-center gap-2 text-sm text-accent",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-accent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [
									Math.floor(seconds / 60),
									":",
									String(seconds % 60).padStart(2, "0")
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-muted",
								children: "Запись голосового"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Отправить голосовое",
						onClick: finishVoice,
						className: "tap grid size-11 place-items-center rounded-full bg-accent text-accent-ink",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-5" })
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "safe-bottom border-t border-line bg-panel px-2 py-2",
				children: [(reply || editing) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center gap-2 border-l-2 border-accent px-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1 py-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-accent",
							children: editing ? "Редактирование" : senderName(chat, reply?.senderId ?? "", me.name)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted",
							children: editing ? editing.text : reply ? messagePreview(reply) : ""
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						label: "Отмена",
						onClick: cancelComposerMode,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
								label: "Вложение",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-5" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
							side: "top",
							align: "start",
							sideOffset: 8,
							className: "pop z-50 w-52 p-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverClose, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "flex h-11 w-full items-center gap-2 rounded-lg px-3 text-sm hover:bg-raised",
									onClick: () => {
										const photo = takePhoto();
										sendSpecial(chat.id, {
											kind: "photo",
											photo: photo.src,
											text: draft
										});
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-4" }), " Фото"]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverClose, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "flex h-11 w-full items-center gap-2 rounded-lg px-3 text-sm hover:bg-raised",
									onClick: () => sendSpecial(chat.id, {
										kind: "file",
										fileName: "Заметка.pdf",
										fileSize: "240 КБ",
										text: draft
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), " Файл"]
								})
							})]
						}) })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
								label: "Эмодзи",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smile, { className: "size-5" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
							side: "top",
							align: "start",
							sideOffset: 8,
							className: "pop z-50 w-96 p-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-8",
								children: EMOJI.map((emoji) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverClose, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "tap grid size-11 place-items-center rounded-lg text-lg hover:bg-raised",
										onClick: () => appendEmoji(emoji),
										children: emoji
									})
								}, emoji))
							})
						}) })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "composer",
							ref: inputRef,
							rows: 1,
							value: draft,
							maxLength: 4e3,
							placeholder: chat.kind === "saved" ? "Заметка" : "Сообщение",
							"aria-label": chat.kind === "saved" ? "Заметка" : "Сообщение",
							onChange: (event) => setDraft(chat.id, event.target.value),
							onKeyDown: (event) => {
								if (event.key === "Enter" && !event.shiftKey) {
									event.preventDefault();
									sendText();
								}
							},
							className: "max-h-32 min-h-11 flex-1 resize-none rounded-2xl border border-line bg-ink px-4 py-2.5 text-base leading-relaxed outline-none placeholder:text-muted"
						}),
						draft.trim() || editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": editing ? "Сохранить" : "Отправить",
							disabled: !draft.trim(),
							onClick: sendText,
							className: "tap grid size-11 place-items-center rounded-full bg-accent text-accent-ink disabled:opacity-40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-5" })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Голосовое сообщение",
							onClick: () => {
								setSeconds(0);
								setRecording(true);
							},
							className: "tap grid size-11 place-items-center rounded-full bg-raised text-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-5" })
						})
					]
				})]
			})
		]
	});
}
function Messenger() {
	if (!useClient()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boot, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {});
}
function Boot() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-dvh items-center justify-center bg-ink text-fg",
		"aria-busy": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NordMark, { className: "size-12" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display tracking-widest",
				children: "NORD"
			})]
		})
	});
}
function App() {
	const activeId = useMessenger((s) => s.activeId);
	const chats = useMessenger((s) => s.chats);
	const messages = useMessenger((s) => s.messages);
	const profileOpen = useMessenger((s) => s.profileOpen);
	const chat = chats.find((item) => item.id === activeId) ?? null;
	(0, import_react.useEffect)(() => {
		const unread = chats.reduce((sum, item) => sum + chatUnread(item.id, messages), 0);
		document.title = unread > 0 ? `(${unread}) NORD` : "NORD";
	}, [chats, messages]);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.key !== "Escape") return;
			const state = useMessenger.getState();
			if (state.createOpen || state.settingsOpen) return;
			if (state.editingId || state.replyToId) {
				state.cancelComposerMode();
				return;
			}
			if (state.threadSearchOpen) {
				state.setThreadSearchOpen(false);
				return;
			}
			if (state.profileOpen) {
				state.setProfileOpen(false);
				return;
			}
			if (window.matchMedia("(max-width: 1023px)").matches && state.activeId) state.setActive(null);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh overflow-hidden bg-ink text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatList, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: activeId ? "relative flex min-w-0 flex-1 flex-col" : "relative hidden min-w-0 flex-1 flex-col lg:flex",
				children: [chat ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thread, { chat }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyThread, {}), profileOpen && chat && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilePanel, { chat })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateDialog, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsDialog, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "top-center",
				toastOptions: { style: {
					background: "var(--color-panel)",
					color: "var(--color-fg)",
					border: "1px solid var(--color-line)"
				} }
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Messenger, {});
}
//#endregion
export { Home as component };
