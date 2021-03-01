//COMANDO PARA "OUVIR" QUANDO O DISPOSITIVO ESTÁ PRONTO
document.addEventListener('deviceready', onDeviceReady.bind(this), false);

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'Framework7 v.3',
    // App id
    id: 'br.com.meuapp',
    // Enable swipe panel
    panel: {
        swipe: 'left',
    },
    // Add default routes
    routes: [
        {
            path: '/index/',
            url: 'index.html',
            on: {
                pageInit: function (event, page) {
					
					//DESATIVAR PAINEL ESQUERDO NA ABERTURA
                    app.panel.disableSwipe('left');
					
                    //REMOVER ANIMACAO DE "CORACAO BATENDO" 2 SEGUNDOS
                    setTimeout(function () {
                        $(".Aligner").removeClass("animated lightSpeedIn");
                    }, 2000);
					
					//ANIMAÇÃO DE BATER CORACAO 2 SEGUNDOS E MEIO
					setTimeout(function () {
                        $(".Aligner").addClass("animated heartBeat");
                    }, 1500);

					//REMOVER ANIMACAO DE "CORACAO BATENDO" 3 SEGUNDOS E MEIO
					setTimeout(function () {
                        $(".Aligner").removeClass("animated heartBeat");
                    }, 2500);
					
                    //FAZER NOVAMENTE ANIMACAO DO CORACAO BATENDO 4 SEGUNDOS E MEIO
                    setTimeout(function () {
                        $(".Aligner").addClass("animated lightSpeedOut");
                    }, 3500);


                    //REDIRECIONAR PARA HOME EM 5 SEGUNDOS
                    setTimeout(function () {
						
                        var login = localStorage.getItem("login");

                        if(login==null){
                            app.views.main.router.navigate('/home/');
                        }else{
                            app.views.main.router.navigate('/login/');
                        }
                    	
                    }, 5500);
					
					

                    }
               }
        },
		{
            path: '/home/',
            url: 'home.html',
            on: {
                pageInit: function (event, page) {
					
					//EVENTO PARA O SWIFTCH
                    setTimeout(function(){
                        app.dialog.alert('<img src="img/swipe-left-2.gif" style="max-width: 100%;">', '');
                    }, 500);

					$("#queroCadastrar").on("click", function(){
						app.views.main.router.navigate('/cadastrar/');
					});
		
				}	
               }
        },
        {
            path: '/new/',
            url: 'new.html',
            on: {
                pageInit: function (event, page) {
				
						//MODELO DE ROTA PRONTA PARA COPIAR

                    }
               }
        },


        {
            path: '/destino/',
            url: 'destino.html',
            on: {
                pageInit: function (event, page) {
				
                    app.panel.close();
                    

                    }
               }
        },	

        {
            path: '/cadastrarUsuario/',
            url: 'app/cadastrar_usuario.html',
            on: {
                pageInit: function (event, page) {
				
                    //FECHA O MENU SLIDE
                    app.panel.close();


                    app.dialog.preloader('Buscando...');

                     //PUXANDO OS DADOS VIA AJAX
                     $.ajax({
                        type: 'POST', 
                        data: {chave:'app'}, 
                        url: 'https://criacaotatica.com.br/credvalor/app/teste/buscar_usuario.php', 
                             
                        success: function (resposta) {

                            if(resposta !== 0){
                                app.dialog.close();
                                $("#listaTeste").html(resposta);
                            }

                            if(resposta == 0){
                                app.dialog.alert('Houve um problema, tente novamente', 'OPSS...');                                
                            }
                        
                        },
                         
                        error: function (erro) {
                                app.dialog.alert('Houve um erro no servidor.', 'CONEXÃO!');                  
                        },
                         
                        complete: function(){
                         
                        }
                        
                        });


                    // Prompt
                    $('#pesquisa').on('click', function () {
                        app.dialog.prompt('Informe o nome', 'LOCALIZAR', function (nome) {

                    
                            app.dialog.preloader('Pesquisando...');


                     //BUSCANDO DADOS DA PESQUISA VIA AJAX
                     $.ajax({
                        type: 'POST', 
                        data: {nome:nome, chave:'app'}, 
                        url: 'https://criacaotatica.com.br/credvalor/app/teste/pesquisar.php', 
                             
                        success: function (resposta) {

                            if(resposta !== 0){
                                app.dialog.close();
                                $("#listaTeste").html(resposta);
                            }

                            if(resposta == 0){
                                app.dialog.alert('Houve um problema, tente novamente', 'OPSS...');                                
                            }
                        
                        },
                         
                        error: function (erro) {
                                app.dialog.alert('Houve um erro no servidor.', 'CONEXÃO!');                  
                        },
                         
                        complete: function(){
                         
                        }
                        
                        });


                        });
                    });




                    //pega as informações dos inputs
                    $("#cadastrarUsuario").on("click", function(){

                        var nome  = $("#nomeUsuario").val();
                        var login = $("#loginUsuario").val(); 
                        
                        if(nome == '' || login == ''){

                            app.dialog.alert('Preencha todos os campos.', 'ATENÇÃO!');

                        }else{

                            app.dialog.preloader('Salvando dados...');

                            //ENVIANDO DADOS VIA AJAX
                            $.ajax({
                                type: 'POST', 
                                data: {variavel_nome:nome, variavel_login:login, chave:'app'}, 
                                url: 'https://criacaotatica.com.br/credvalor/app/teste/cadastrar_usuario.php', 
                                     
                                success: function (resposta) {

                                    if(resposta == 1){
                                        app.dialog.close();
                                        app.dialog.alert('Teste cadastrado.', 'SUCESSO!');
                                        $("#nomeUsuario").val('');
                                        $("#loginUsuario").val(''); 
                                    }

                                    if(resposta == 0){
                                        app.dialog.close();
                                        app.dialog.alert('Houve um problemas.', 'ERRO!');
                                    }
                                
                                },
                                 
                                error: function (erro) {
                                        app.dialog.alert('Houve um erro no servidor.', 'CONEXÃO!');                  
                                },
                                 
                                complete: function(){
                                 
                                }
                                
                                });

                        }

                    });



                    }
               }
        },
        
        {
            path: '/cadastrarparceiro/',
            url: 'app/cadastrar_parceiro.html',
            on: {
                pageInit: function (event, page) {
				
						app.panel.close();

                        $('#CadtelefoneCadastro').mask('(00) 00000-0009');
                        $('#CadcpfCadastro').mask('000.000.000-00');
                        $('#CadcnpjCadastro').mask('00.000.000/0000-00');

                        //CLICANDO NO BOTÃO CASTRAR PARCEIROS
                        $('#CadcadastraParceiro').click(function () {

                            var nome = $$("#CadnomeCadastro").val();
                            var email = $$("#CademailCadastro").val();
                            //var senha = $$("#CadsenhaCadastro").val();
                            //var RepeteSenha = $$("#CadrepeteSenhaCadastro").val();
                            var celular = $$("#CadtelefoneCadastro").val();
                            var cpf = $$("#CadcpfCadastro").val();
                            var cnpj = $$("#CadcnpjCadastro").val();
                            var razao_social = $$("#CadrazaoSocial").val();
                            //var dataNascimento = $$("#CaddatanascimentoCadastro").val();	
                        
                            if ((nome == '') || (email == '') || (celular == '') || (cpf =='')) {
                                   app.dialog.alert('Verifique se os campos obrigatorios foram preenchidos.', '<i class="mdi mdi-alert"></i> Campos faltando!');
                                    return false;                            
                            }
    
                            if ((nome !== '') && (email !== '') && (celular !== '')&& (cpf !== '')) {
    
                                //VALIDACAO DO EMAIL
                                var sEmail = email;
                                // filtros
                                var emailFilter = /^.+@.+\..{2,}$/;
                                var illegalChars = /[\(\)\<\>\,\;\:\\\/\"\[\]]/
                                // condicao
                                if (!(emailFilter.test(sEmail)) || sEmail.match(illegalChars)) {
                                    //EMAIL INVALIDO
                                    app.dialog.alert('Por favor, informe um e-mail valido!', '<i class="mdi mdi-alert"></i> E-mail Invalido');
                                        return false;
                                                                 
                                } else {								
                                 
                                        //EMAIL E VALIDO
                                     if(($("#CadcheckPolitica").is(":checked"))&&($("#CadcheckTermos").is(":checked"))){
                                        //TA TUDO OK
                                    //TUDO OK
                                        //AJAX PARA CADASTRAR
                                        app.dialog.preloader('Cadastrando');                          
                                  
                                    $.ajax({
                                        type: 'POST',
                                        data: { nome: nome, email: email, celular: celular, cpf: cpf, cnpj: cnpj, razao_social: razao_social, valida:'ok'},
                                        url: 'https://criacaotatica.com.br/credvalor/app/parceiros/cadastrar_parceiro.php',
                                        crossDomain: true,
    
                                        success: function (resposta) {
    
                                            if (resposta == 0) {
                                                app.dialog.close();
    
                                                    app.dialog.alert('Parceiro cadastrado com sucesso.', '<i class="mdi mdi-email-check-outline"></i> <b>Cadastrado!</b>', function () {
                                                        app.views.main.router.navigate('/destino/');
                                                    });
    
                                            }
    
                                            if (resposta == 1) {
                                                app.dialog.close();
                                               app.dialog.alert('Por favor tente novamente!', 'Falhou...');                                   
                                                
                                            }
    
                                            if (resposta == 3) {
                                                app.dialog.close();
    
                                                    app.dialog.alert('Por favor, informe outro email!', '<i class="mdi mdi-email-lock"></i> <b>Email j&aacute; Cadastrado</b>');
                                                                                           
                                              
    
                                            }
    
                             
    
                                        },
    
                                        error: function (erro) {
                                            app.dialog.close();
                                         
                                           app.dialog.alert('Falha em se comunicar com servidor. Por favor, tente novamente!', 'FALHA DE CADASTRO');
                                                                                   
                                        }
    
                                    });
                                    
                                    
                                    
                                    }else{
                                    app.dialog.alert("É preciso aceitar as <b>Políticas de Privacidade</b> e também os <b>Termos de Uso</b> para se cadastrar.","<i class='mdi mdi-alert'></i> Aceitar Termos");  
                                    }
                                        
                                                                           
                                                                 
                                        
                                }
    
    
                            }
                         
                                                 
                     });


                    }
               }
        },


		{
            path: '/cadastrar/',
            url: 'cadastrar.html',
            on: {
                pageInit: function (event, page) {
				
					$('#CadtelefoneCadastro').mask('(00) 00000-0009');
					$('#CadcpfCadastro').mask('000.000.000-00');
					
					$('#Cadcadastra').click(function () {
					 
						var nome = $$("#CadnomeCadastro").val();
                        var email = $$("#CademailCadastro").val();
                        var senha = $$("#CadsenhaCadastro").val();
						var RepeteSenha = $$("#CadrepeteSenhaCadastro").val();
						var telefone = $$("#CadtelefoneCadastro").val();
						var CPF = $$("#CadcpfCadastro").val();
						var dataNascimento = $$("#CaddatanascimentoCadastro").val();	
                    
                        if ((nome == '') || (email == '') || (senha == '') || (telefone =='')|| (CPF =='')|| (RepeteSenha =='')|| (dataNascimento =='')) {
                               app.dialog.alert('Por favor, todos os campos sao obrigatorios.', '<i class="mdi mdi-alert"></i> Campos faltando!');
                                return false;                            
                        }

                        if ((nome !== '') && (email !== '') && (senha !== '')&& (telefone !== '')&& (CPF !== '')&& (RepeteSenha !== '')&& (dataNascimento !== '')) {

                            //VALIDACAO DO EMAIL
                            var sEmail = email;
                            // filtros
                            var emailFilter = /^.+@.+\..{2,}$/;
                            var illegalChars = /[\(\)\<\>\,\;\:\\\/\"\[\]]/
                            // condicao
                            if (!(emailFilter.test(sEmail)) || sEmail.match(illegalChars)) {
                                //EMAIL INVALIDO
                                app.dialog.alert('Por favor, informe um e-mail valido!', '<i class="mdi mdi-alert"></i> E-mail Invalido');
                                    return false;
                                                             
                            } else {								
								//VERIFICAR SE AS SENHAS SAO IGUAIS
								if (senha==RepeteSenha){
									//SENHAS SAO IGUAIS - VERIFICAR O CHECKBOX
									//EMAIL E VALIDO
                                 if(($("#CadcheckPolitica").is(":checked"))&&($("#CadcheckTermos").is(":checked"))){
									//TA TUDO OK
								//TUDO OK
                                    //AJAX PARA CADASTRAR
									app.dialog.preloader('Cadastrando');                          
                              
                                $.ajax({
                                    type: 'POST',
                                    data: { nome: nome, email: email, senha: senha, telefone: telefone, CPF:CPF, datanascimento:dataNascimento,valida:'ok'},
                                    url: 'https://criacaotatica.com.br/credvalor/cadastra.php',
                                    crossDomain: true,

                                    success: function (resposta) {

                                        if (resposta == 0) {
                                            app.dialog.close();

                                                app.dialog.alert('Tudo certo. Um email foi enviado para endere&ccedil;o cadastrado. Caso esque&ccedil;a a senha verifique este email.', '<i class="mdi mdi-email-check-outline"></i> <b>Cadastrado!</b>', function () {
                                                    //ARMAZENA CADA ITEM DO USUARIO EM UM LOCALSTORAGE
                                                    localStorage.setItem("nome", nome);
                                                    localStorage.setItem("login", email);
                                                    localStorage.setItem("senha", senha);
													localStorage.setItem("telefone", telefone);
													localStorage.setItem("CPF", CPF);
													localStorage.setItem("DataNascimento", dataNascimento);
													
													app.views.main.router.navigate('/destino/');
                                                });
                           
                                           

                                        }

                                        if (resposta == 1) {
                                            app.dialog.close();
                                           app.dialog.alert('Por favor tente novamente!', 'Falhou...');                                   
                                            
                                        }

                                        if (resposta == 3) {
                                            app.dialog.close();

                                                app.dialog.alert('Por favor, informe outro email!', '<i class="mdi mdi-email-lock"></i> <b>Email j&aacute; Cadastrado</b>');
                                                                                       
                                          

                                        }

                         

                                    },

                                    error: function (erro) {
                                        app.dialog.close();
                                     
                                       app.dialog.alert('Falha em se comunicar com servidor. Por favor, tente novamente!', 'FALHA DE CADASTRO');
                                                                               
                                    }

                                });
								
								
								
								}else{
								app.dialog.alert("É preciso aceitar as <b>Políticas de Privacidade</b> e também os <b>Termos de Uso</b> para se cadastrar.","<i class='mdi mdi-alert'></i> Aceitar Termos");  
								}
									
									
								}else{
								  app.dialog.alert('A senha e a repetição da senha não são iguais!', '<i class="mdi mdi-alert"></i> Senha e Repetição de Senha');
                                    return false;	
								}
								
								
                                							 
                                    
                            }


                        }
					 
					 						
				 });

                    }
               }
        },		
        


        {
            path: '/login/',
            url: 'login.html',
            on: {
                pageInit: function (event, page) {

                  			
						$('#Fazerlogin').on('click', function () {
                       
                        var email = $("#ContaLogin").val();
                        var senha = $("#ContaSenha").val();

                        if ((email == '') || (senha == '')) {
                         app.dialog.alert('Por favor, preencha seu email e senha.', '<i class="mdi mdi-alert"></i> Campos Vazios');                        
                           
                        }else{
                           
							app.dialog.preloader('Fazendo Login'); 
                                                      
                            $.ajax({
                                type: 'POST',
                                data: { email: email, senha: senha, chave:'123'},
                                url: 'https://criacaotatica.com.br/credvalor/login.php',
                                crossDomain: true,

                                success: function (respost) {

                                    if (respost == 0) {
                                        app.dialog.close();

                                            app.dialog.alert('Nenhum usuário encontrado com este login / senha. Tente novamente!', '<i class="mdi mdi-alert-circle"></i> <b>Login Inválido</b>');
                                            return false;
                                   
                                    }

                                    if (respost !== 0) {
                                        app.dialog.close();
                                        
                                        //DESENCAPSULA OS DADOS DA RESPOSTA
                                        var dados = JSON.parse(respost);

                                        //ARMAZENA CADA ITEM DO USUARIO EM UM LOCALSTORAGE
                                        localStorage.setItem("nome", dados.nome);
                                        localStorage.setItem("login", dados.email);
                                        localStorage.setItem("senha", dados.senha);
										localStorage.setItem("telefone", dados.telefone);
										localStorage.setItem("CPF", dados.cpf);
                                        										                                     
                                      //REDIRECIONA PARA PAGINA PRINCIPAL
                                       app.views.main.router.navigate('/destino/');
                                      
                                    }

                                    

                                },

                                error: function (erro) {
                                    app.dialog.close();
                                 
                                        app.dialog.alert('Falha em se comunicar com servidor. Por favor, tente novamente!');
                                   
                                    
                                   
                                }

                            });
                        }

                        
                    });
					
					$('#esqueceuSenha').on('click', function () {
						app.dialog.prompt('Informe o e-mail de login','<b>SEU EMAIL DE LOGIN</b>', function (email) {
									
					var email=email;
					
					app.dialog.preloader('Verificando');
					
					$.ajax({
						type: 'POST', 
						data: {email:email,chave:'123'}, 
						url: 'https://criacaotatica.com.br/credvalor/verificar-email.php',  
							 
						success: function (resposta) {
							
							
							if (resposta==0){
							app.dialog.close();
								app.dialog.prompt('Você recebeu <b><u>no seu email</u></b> um código de verificação para autorizar a criação de uma nova senha. <b>Por favor, informe o código recebido no email</b>:','<b>CÓDIGO DE VERIFICAÇÃO</b>', function (codigo) {
									localStorage.setItem('emailValido',email);
									validaCodigo(codigo);
								});
							
							}
							
							if (resposta==1){
								app.dialog.close();
								app.dialog.alert('Por favor, informe um email válido!','<b>E-MAIL NÃO ENCONTRADO</b>');
							}
							
							if (resposta==2){
								app.dialog.close();
								app.dialog.alert('Houve um problema. Tente novamente','<b>OPS!</b>');
							}
							
						},
							
						error: function (erro) {
							app.dialog.close();
							app.dialog.alert('Não foi possivel se conectar ao servidor');								   
						},
												
						});
					
					
				  });
					});
					
					function validaCodigo(codigo){
						
						app.dialog.close();
						app.dialog.preloader('Verificando');
						
						var email=localStorage.getItem('emailValido');
						
						$.ajax({
						type: 'POST', 
						data: {email:email,codigo:codigo,chave:'123'}, 
						url: 'https://criacaotatica.com.br/credvalor/verificar-codigo.php',  
							 
						success: function (resposta) {
							
							if (resposta==0){
							app.dialog.close();
								app.dialog.prompt('Informe a nova senha:','<b>NOVA SENHA</b>', function (senha) {
									criarNovaSenha(senha);
								});
							
							}
							
							if (resposta==1){
								app.dialog.close();
								app.dialog.alert('Por favor, informe um código válido!','<b>CÓDIGO INVÁLIDO</b>');
							}
							
							if (resposta==2){
								app.dialog.close();
								app.dialog.alert('Houve um problema. Tente novamente','<b>OPS!</b>');
							}
							
						},
							
						error: function (erro) {
							app.dialog.close();
							app.dialog.alert('Não foi possivel se conectar ao servidor');								   
						},
						
						
						});
						
						
					}
					
					function criarNovaSenha(senha){
						
						app.dialog.close();
						
						app.dialog.preloader('Salvando nova senha');						
						var email=localStorage.getItem('emailValido');
						
						$.ajax({
						type: 'POST', 
						data: {email:email,senha:senha,chave:'123'}, 
						url: 'https://criacaotatica.com.br/credvalor/salvar-nova-senha.php',  
							 
						success: function (resposta) {
							
							if (resposta==0){
							app.dialog.close();
						    app.dialog.alert('Nova senha gerada. Você já pode fazer login com ela!','<b>SUCESSO!</b>');							
							}
							
							if (resposta==1){
								app.dialog.close();
								app.dialog.alert('Por favor, informe um código válido!','<b>CÓDIGO INVÁLIDO</b>');
							}
							
							if (resposta==2){
								app.dialog.close();
								app.dialog.alert('Houve um problema. Tente novamente','<b>OPS!</b>');
							}
							
						},
							
						error: function (erro) {
							app.dialog.close();
							app.dialog.alert('Não foi possivel se conectar ao servidor');								   
						},
						
						
						});
						
						
					}

                    }

                    
                    

               }
        },

    ],
    // ... other parameters
});

var $$=Dom7;

//QUANDO O DISPOSITIVO ESTIVER PRONTO
function onDeviceReady() {
	
	//DISPOSITIVO PRONTO INICIALIZAR POR ESSA ROTA
    var mainView = app.views.create('.view-main', {
        url: '/index/'
    });
	
	 //COMANDO PARA "OUVIR" O BOTAO VOLTAR NATIVO DO ANDROID 	
	 document.addEventListener("backbutton", onBackKeyDown, false);

//FUNCÃO QUANDO CLICAR NO BOTAO VOLTAR NATIVO
function onBackKeyDown() {
	
	//VARIAVEL PARA VER EM QUE ROTA ESTAMOS
	var nome=app.views.main.router.url;
    
	//EXEMPLO DE VOLTAR:	
	//if (nome=='/home/'){
	//app.views.main.router.navigate('/index/');	
	//}
	
	
	
}

}