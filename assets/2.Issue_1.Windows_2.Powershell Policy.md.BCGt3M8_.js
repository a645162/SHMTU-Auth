import{_ as s,n as e,m as i,a5 as a}from"./chunks/framework.DItCcVjF.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"2.Issue/1.Windows/2.Powershell Policy.md","filePath":"2.Issue/1.Windows/2.Powershell Policy.md"}'),l={name:"2.Issue/1.Windows/2.Powershell Policy.md"},t=a(`<h2 id="powershell-执行策略详解" tabindex="-1">PowerShell 执行策略详解 <a class="header-anchor" href="#powershell-执行策略详解" aria-label="Permalink to &quot;PowerShell 执行策略详解&quot;">​</a></h2><p>PowerShell 执行策略规定了在系统上允许执行的脚本的级别。以下是 PowerShell 中的不同执行策略及其说明：</p><h3 id="_1-restricted-受限制" tabindex="-1">1. Restricted（受限制） <a class="header-anchor" href="#_1-restricted-受限制" aria-label="Permalink to &quot;1. Restricted（受限制）&quot;">​</a></h3><ul><li><p><strong>描述：</strong> 仅允许 PowerShell 运行命令，不允许运行脚本。</p></li><li><p><strong>命令：</strong></p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Get-ExecutionPolicy</span></span></code></pre></div></li><li><p><strong>修改策略：</strong></p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 修改执行策略为 RemoteSigned（或其他适当的策略）</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Set-ExecutionPolicy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> RemoteSigned</span></span></code></pre></div></li></ul><h3 id="_2-allsigned-已数字签名" tabindex="-1">2. AllSigned（已数字签名） <a class="header-anchor" href="#_2-allsigned-已数字签名" aria-label="Permalink to &quot;2. AllSigned（已数字签名）&quot;">​</a></h3><ul><li><p><strong>描述：</strong> 只允许已数字签名的脚本运行。本地创建的脚本无需签名，但从远程下载的脚本必须经过数字签名。</p></li><li><p><strong>命令：</strong></p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Get-ExecutionPolicy</span></span></code></pre></div></li><li><p><strong>修改策略：</strong></p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 修改执行策略为 RemoteSigned（或其他适当的策略）</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Set-ExecutionPolicy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> RemoteSigned</span></span></code></pre></div></li></ul><h3 id="_3-remotesigned-远程已数字签名" tabindex="-1">3. RemoteSigned（远程已数字签名） <a class="header-anchor" href="#_3-remotesigned-远程已数字签名" aria-label="Permalink to &quot;3. RemoteSigned（远程已数字签名）&quot;">​</a></h3><ul><li><p><strong>描述：</strong> 允许本地创建的脚本运行，但从远程下载的脚本必须是数字签名的。</p></li><li><p><strong>命令：</strong></p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Get-ExecutionPolicy</span></span></code></pre></div></li><li><p><strong>修改策略：</strong></p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 修改执行策略为 Unrestricted（或其他适当的策略）</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Set-ExecutionPolicy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Unrestricted</span></span></code></pre></div></li></ul><h3 id="_4-unrestricted-不受限制" tabindex="-1">4. Unrestricted（不受限制） <a class="header-anchor" href="#_4-unrestricted-不受限制" aria-label="Permalink to &quot;4. Unrestricted（不受限制）&quot;">​</a></h3><ul><li><p><strong>描述：</strong> 允许所有脚本运行，不考虑数字签名。这是最不限制的执行策略，但也是潜在的安全风险。</p></li><li><p><strong>命令：</strong></p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Get-ExecutionPolicy</span></span></code></pre></div></li><li><p><strong>修改策略：</strong></p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 修改执行策略为 Restricted（或其他适当的策略）</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Set-ExecutionPolicy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Restricted</span></span></code></pre></div></li></ul><h3 id="_5-bypass" tabindex="-1">5. Bypass <a class="header-anchor" href="#_5-bypass" aria-label="Permalink to &quot;5. Bypass&quot;">​</a></h3><ul><li><p><strong>描述：</strong> 不执行任何检查，允许所有脚本运行。这是潜在的安全风险，仅在特殊情况下使用。</p></li><li><p><strong>命令：</strong></p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Get-ExecutionPolicy</span></span></code></pre></div></li><li><p><strong>修改策略：</strong></p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 修改执行策略为 Restricted（或其他适当的策略）</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Set-ExecutionPolicy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Restricted</span></span></code></pre></div></li></ul><h3 id="_6-undefined" tabindex="-1">6. Undefined <a class="header-anchor" href="#_6-undefined" aria-label="Permalink to &quot;6. Undefined&quot;">​</a></h3><ul><li><p><strong>描述：</strong> 表示没有明确定义的执行策略。</p></li><li><p><strong>命令：</strong></p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Get-ExecutionPolicy</span></span></code></pre></div></li><li><p><strong>修改策略：</strong></p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 修改执行策略为 Restricted（或其他适当的策略）</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Set-ExecutionPolicy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Restricted</span></span></code></pre></div></li></ul><blockquote><p><strong>注意：</strong> 修改执行策略可能需要管理员权限。确保在适当的情况下执行修改，并了解每种执行策略的安全性和适用场景。</p></blockquote>`,15),n=[t];function p(o,h,r,d,c,g){return i(),e("div",null,n)}const y=s(l,[["render",p]]);export{u as __pageData,y as default};