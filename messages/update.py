import json
with open("messages/zh.json", "r", encoding="utf-8") as f:
    zh = json.load(f)
zh["footer"]["company_name"] = "Far Horizon Logistics Consulting Ltd."
zh["footer"]["address"] = "上海市浦东新区陆家嘴环路1000号恒生银行大厦18楼1805室"
zh["footer"]["icp"] = "沪ICP备2026XXXXX号"
zh["footer"]["cookies"] = "Cookie声明"
zh["cookie_consent"] = {"banner_text": "本网站使用Cookie以优化您的浏览体验。继续使用即表示您同意我们的Cookie政策。","accept": "接受","learn_more": "了解更多","title": "Cookie 政策","lastUpdated": "最后更新日期：2026年6月20日","intro": "本Cookie政策说明了Far Horizon Logistics Consulting Ltd.如何使用Cookie。","section1_title": "必要型Cookie","section1_desc": "必要型Cookie是网站运行所必需的，不会收集个人可识别信息。","section2_title": "分析型Cookie","section2_desc": "分析型Cookie收集匿名统计信息以帮助我们改进服务。","section3_title": "如何管理Cookie","section3_desc": "您可以在浏览器设置中管理Cookie。"}
zh["privacy"] = {"title": "隐私政策","lastUpdated": "最后更新日期：2026年6月20日","section1_title": "信息收集","section1_desc": "当您提交咨询请求时，我们收集姓名、邮箱、电话、公司名称及咨询内容。","section2_title": "信息使用","section2_desc": "信息仅用于回复咨询和提供服务，不会出售给第三方。","section3_title": "信息存储与安全","section3_desc": "信息保留不超过12个月，采取SSL加密和访问控制保护。","section4_title": "用户权利","section4_desc": "您有权访问、更正或删除您的个人信息。","section5_title": "Cookie 使用说明","section5_desc": "本网站使用必要型和Cookie。详见Cookie政策。","section6_title": "政策更新","section6_desc": "本政策可能不定期更新。","section7_title": "联系我们","section7_desc": "contact@farhorizon-logistics.com / +86-21-5888-8888"}
zh["terms"] = {"title": "用户协议","lastUpdated": "最后更新日期：2026年6月20日","section1_title": "服务范围","section1_desc": "本网站提供信息咨询参考，不构成运输合同或法律协议。我们不承担运输合同项下的任何责任。","section2_title": "用户责任","section2_desc": "您同意提供真实信息并合法使用本网站。","section3_title": "知识产权","section3_desc": "网站内容版权归Far Horizon Logistics Consulting Ltd.所有。","section4_title": "免责声明","section4_desc": "所有内容仅供参考，不构成法律建议。我们不承担任何损失责任。","section5_title": "责任限制","section5_desc": "在法律允许范围内，我们不承担间接损害责任。","section6_title": "终止","section6_desc": "我们保留暂停或终止访问的权利。","section7_title": "争议解决","section7_desc": "适用中国法律，争议由上海市有管辖权的法院解决。"}
with open("messages/zh.json", "w", encoding="utf-8") as f:
    json.dump(zh, f, ensure_ascii=False, indent=2)

with open("messages/en.json", "r", encoding="utf-8") as f:
    en = json.load(f)
en["footer"]["company_name"] = "Far Horizon Logistics Consulting Ltd."
en["footer"]["address"] = "Room 1805, 18/F, HSBC Building, 1000 Lujiazui Ring Road, Pudong New Area, Shanghai, China"
en["footer"]["icp"] = "ICP License: Hu ICP Bei No.2026XXXXX"
en["footer"]["cookies"] = "Cookie Statement"
en["cookie_consent"] = {"banner_text": "We use cookies to optimize your browsing experience. By continuing, you consent to our Cookie Policy.","accept": "Accept","learn_more": "Learn More","title": "Cookie Policy","lastUpdated": "Last updated: June 20, 2026","intro": "This Cookie Policy explains how we use cookies on this website.","section1_title": "Strictly Necessary Cookies","section1_desc": "Strictly necessary cookies enable core website functionality. They do not collect personal information.","section2_title": "Analytical Cookies","section2_desc": "Analytical cookies collect anonymous statistics to help us improve the website.","section3_title": "How to Manage Cookies","section3_desc": "You can manage cookies through your browser settings."}
en["privacy"]["section1_desc"] = "We collect your name, email, phone number, company name, and message content when you submit a consultation request."
en["terms"]["section1_desc"] = "This website provides informational content only and does not constitute a transport contract or legal agreement."
with open("messages/en.json", "w", encoding="utf-8") as f:
    json.dump(en, f, ensure_ascii=False, indent=2)
print("Both files done")