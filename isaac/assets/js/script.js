document.addEventListener("DOMContentLoaded", function() {

    const hamBurger = document.querySelector(".sidebar-item");

    hamBurger.addEventListener("click", function () {
        if (window.innerWidth > 800) {
            document.querySelector("#sidebar").classList.toggle("expand");
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth <= 800) {
            document.querySelector("#sidebar").classList.remove("expand");
        }
    });

    let agents = [
        {
            agentCode: '[3] testePlayFiver',
            agentName: 'tesetPlayFiver',
            agentMemo: 'playFiver',
            type: 'Both Manager',
            apiType: '5',
            balance: 340.54,
            percent: '70%',
            subAgentSum: 0,
            subUserSum: 0,
            createdDate: '2024-05-20 14:04:12',
            accountStatus: 1,
            parentAgent: 'Parent 1',
            agentToken: 'AgentToken123',
            agentSecretKey: 'SecretKey123',
            siteEndPoint: 'http://example.com',
            password: '123'
        },
        {
            agentCode: '[2] testePlayFiver',
            agentName: 'tesetPlayFiver',
            agentMemo: 'playFiver',
            type: 'Both Manager',
            apiType: '5',
            balance: 340.54,
            percent: '70%',
            subAgentSum: 0,
            subUserSum: 0,
            createdDate: '2024-05-20 14:04:12',
            accountStatus: 1,
            parentAgent: 'Parent 2',
            agentToken: 'AgentToken456',
            agentSecretKey: 'SecretKey456',
            siteEndPoint: 'http://example.org',
            password: '123'
        }
    ];

    let ip = [
        {
            agentName: 'tesetPlayFiver 1',
            adress: '111.222.333.444',
            createdDate: '2024-05-20 14:04:12'
        },
        {
            agentName: 'tesetPlayFiver 2',
            adress: '111.222.333.444',
            createdDate: '2024-05-20 14:04:12'
        },
        {
            agentName: 'tesetPlayFiver 3',
            adress: '111.222.333.444',
            createdDate: '2024-05-20 14:04:12'
        }
    ];

    function renderAgents() {
        try {
            const contentTableBodyAgent = document.getElementById('contentTableBodyAgent');
            const allAgentsElement = document.getElementById('allAgents');
            let totalAgents = 0;
            contentTableBodyAgent.innerHTML = '';

            agents.forEach(agent => {
                const tr = document.createElement('tr');

                tr.innerHTML = `
                    <td>${agent.agentCode}</td>
                    <td>${agent.agentName}</td>
                    <td>${agent.agentMemo}</td>
                    <td class="columnType">${agent.type}</td>
                    <td>${agent.apiType}</td>
                    <td>${agent.balance.toFixed(2)}</td>
                    <td>${agent.percent}</td>
                    <td>${agent.subAgentSum}</td>
                    <td>${agent.subUserSum}</td>
                    <td class="columnDate">${agent.createdDate}</td>
                    <td>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="toggleAccountStatus-${agent.agentCode}" ${agent.accountStatus === 1 ? 'checked' : ''} disabled>
                        </div>
                    </td>
                    <td class="columnActions">
                        <button class="btnEditModal" data-bs-toggle="modal" data-bs-target="#updateAgentModal" onclick="openEditModal('${agent.agentCode}')"><i class="lni lni-layout"></i></button>
                        <button class="btnViewModal" data-bs-toggle="modal" data-bs-target="#viewAgentModal"><i class="lni lni-layout"></i></button>
                        <button class="btnExcludeModal"><i class="lni lni-layout"></i></button>
                    </td>
                `;

                contentTableBodyAgent.appendChild(tr);
                totalAgents++;
            });

            try{
                allAgentsElement.textContent = `All Agents: (${totalAgents})`;
            }catch{

            }
        } catch (error) {
            console.error('Error rendering agents:', error);
        }
    }

    function renderIps() {
        try {
            debugger
            const contentTableBodyIp = document.getElementById('contentTableBodyIp');
            const allIpsElement = document.getElementById('allIps');
            let totalIps = 0;
            contentTableBodyIp.innerHTML = '';

            ip.forEach(ip => {
                const tr = document.createElement('tr');

                tr.innerHTML = `
                    <td>${ip.agentName}</td>
                    <td>${ip.adress}</td>
                    <td class="columnDate">${ip.createdDate}</td>
                    <td class="columnExclude">
                        <button class="btnExcludeModal"><i class="lni lni-layout"></i></button>
                    </td>
                `;

                contentTableBodyIp.appendChild(tr);
                totalIps++;
            });

            try{
                allIpsElement.textContent = `All IP Whitelist: (${totalIps})`;
            }catch{

            }
        } catch (error) {
            console.error('Error rendering IPs:', error);
        }
    }

    function copyToClipboard(elementId) {
        const inputElement = document.getElementById(elementId);
        inputElement.select();
        inputElement.setSelectionRange(0, 99999);
        document.execCommand("copy");
    
        inputElement.classList.add('copied');
        setTimeout(() => {
            inputElement.classList.remove('copied');
        }, 1500);
    }
    
    function navigationIps(){
        const itemsPerPage = 10;
    let currentPage = 1;
    let totalPages = Math.ceil(ip.length / itemsPerPage);

    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const pageNumberSpan = document.getElementById('pageNumber');
    const showingPages = document.getElementById('showingPages');
    const contentTableBodyIp = document.getElementById('contentTableBodyIp');

    function renderTablePage(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageItems = ip.slice(startIndex, endIndex);

        contentTableBodyIp.innerHTML = '';

        pageItems.forEach(ipItem => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${ipItem.agentName}</td>
                <td>${ipItem.adress}</td>
                <td>${ipItem.createdDate}</td>
                <td>
                    <button class="btnExcludeModal"><i class="lni lni-layout"></i></button>
                </td>
            `;
            contentTableBodyIp.appendChild(tr);
        });
    }

    function updatePagination() {
        totalPages = Math.ceil(ip.length / itemsPerPage);
        pageNumberSpan.textContent = `${currentPage}`;
        const startItem = (currentPage - 1) * itemsPerPage + 1;
        const endItem = Math.min(currentPage * itemsPerPage, ip.length);
        showingPages.textContent = `Showing ${startItem} to ${endItem} of ${ip.length} entries`;
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;
    }

    prevPageButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderTablePage(currentPage);
            updatePagination();
        }
    });

    nextPageButton.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            renderTablePage(currentPage);
            updatePagination();
        }
    });

    renderTablePage(currentPage);
    updatePagination();
    }

    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            copyToClipboard(targetId);
        });
    });

    function initializeModalsAgent() {
        modalAgentsUpdate();
        modalAgentsCreate();
        modalAgentView();
        modalIpCreate();
        debugger
    }

    function modalAgentsUpdate() {
        function openEditModal(agentCode) {
            debugger
            const agent = agents.find(a => a.agentCode === agentCode);
    
            if (agent) {
                document.getElementById('parentAgent').value = agent.parentAgent;
                document.getElementById('agentNameInput').value = agent.agentName;
                document.getElementById('agentCodeInput').value = agent.agentCode;
                document.getElementById('passwordInput').value = agent.password;
                document.getElementById('agentTokenInput').value = agent.agentToken;
                document.getElementById('agentSecretKeyInput').value = agent.agentSecretKey;
                document.getElementById('percentInput').value = agent.percent;
                document.getElementById('memoInput').value = agent.agentMemo;
                document.getElementById('agentTypeSelect').value = agent.type;
                document.getElementById('apiTypeSelect').value = agent.apiType;
                document.getElementById('siteEndpointInput').value = agent.siteEndPoint;
    
                const modal = new bootstrap.Modal(document.getElementById('updateAgentModal'));
                modal.show();
            }
        }
       
        document.getElementById('updateAgentButton').addEventListener('click', function() {
            const agentCode = document.getElementById('agentCodeInput').value;
            const agentIndex = agents.findIndex(a => a.agentCode === agentCode);
    
            if (agentIndex !== -1) {
                agents[agentIndex].parentAgent = document.getElementById('parentAgent').value;
                agents[agentIndex].agentName = document.getElementById('agentNameInput').value;
                agents[agentIndex].agentToken = document.getElementById('agentTokenInput').value;
                agents[agentIndex].agentSecretKey = document.getElementById('agentSecretKeyInput').value;
                agents[agentIndex].percent = document.getElementById('percentInput').value;
                agents[agentIndex].agentMemo = document.getElementById('memoInput').value;
                agents[agentIndex].type = document.getElementById('agentTypeSelect').value;
                agents[agentIndex].apiType = document.getElementById('apiTypeSelect').value;
                agents[agentIndex].siteEndPoint = document.getElementById('siteEndpointInput').value;
                agents[agentIndex].password = document.getElementById('passwordInput').value; // Lembrar de atualizar a senha também, se necessário
            }
    
            const modal = bootstrap.Modal.getInstance(document.getElementById('updateAgentModal'));
            modal.hide();
            renderAgents();
        });
    }
    
    function modalAgentsCreate() {
        const createButton = document.querySelector('.btnCreate');
        const createAgentButton = document.getElementById('createAgentButton');

        createButton.addEventListener('click', function() {
            const createModal = new bootstrap.Modal(document.getElementById('createAgentModal'));
            createModal.show();
        });

        createAgentButton.addEventListener('click', function() {
            const newAgent = {
                parentAgent: document.getElementById('createParentAgent').value,
                agentName: document.getElementById('createAgentNameInput').value,
                agentCode: document.getElementById('createAgentCodeInput').value,
                password: document.getElementById('createPasswordInput').value,
                percent: document.getElementById('createPercentInput').value,
                agentMemo: document.getElementById('createMemoInput').value,
                type: document.getElementById('createAgentTypeSelect').value,
                apiType: document.getElementById('createApiTypeSelect').value,
            };

            agents.push(newAgent);

            const createModal = bootstrap.Modal.getInstance(document.getElementById('createAgentModal'));
            createModal.hide();
            renderAgents();
        });
    }

    function modalAgentView() {
        document.getElementById('contentTableBodyAgent').addEventListener('click', function(event) {
            if (event.target.closest('.btnViewModal')) {
                const agentCode = event.target.closest('tr').querySelector('td:first-child').textContent;
                openViewModal(agentCode);
            }
        });

        function openViewModal(agentCode) {
            const agent = agents.find(a => a.agentCode === agentCode);

            if (agent) {
                document.getElementById('viewParentAgent').textContent = agent.parentAgent;
                document.getElementById('viewAgentName').textContent = agent.agentName;
                document.getElementById('viewAgentCode').textContent = agent.agentCode;
                document.getElementById('viewPassword').textContent = agent.password;
                document.getElementById('viewPercent').textContent = agent.percent;
                document.getElementById('viewMemo').textContent = agent.agentMemo;
                document.getElementById('viewAgentType').textContent = agent.type;
                document.getElementById('viewApiType').textContent = agent.apiType;
                document.getElementById('viewSiteEndpoint').textContent = agent.siteEndPoint;
                document.getElementById('viewAgentToken').textContent = agent.agentToken;
                document.getElementById('viewAgentSecretKey').textContent = agent.agentSecretKey;

                const viewModal = new bootstrap.Modal(document.getElementById('viewAgentModal'));
                viewModal.show();
            }
        }
    }

    function modalIpCreate(){
        const ipAddressInput = document.getElementById('createIpAddress');

        ipAddressInput.addEventListener('input', function() {
            let value = this.value;
            value = value.replace(/\D/g, ''); 
            value = value.replace(/(\d{1,3})(\d{1,3})?(\d{1,3})?(\d{1,3})?/, function(match, p1, p2, p3, p4) {
                let parts = [p1, p2, p3, p4].filter(Boolean);
                return parts.join('.'); 
            });
            this.value = value;
        });
    }

    loadPage('/dashboard.html')
});

function loadPage(page) {
    if (!page) {
        page = '/dashboard.html';
    }

    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('componentPage').innerHTML = data;
            if (page === '/agent.html') {
                renderAgents();
                initializeModalsAgent();
            }
            if (page === '/ip.html') {
                renderIps();
                navigationIps();
            }
        })
        .catch(error => console.error('Error loading page:', error));
}
