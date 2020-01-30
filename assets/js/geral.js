$(document).ready(function(){
    // Menu Mobile
    $( "#menuMobile" ).click(function() {
        $( ".menuDesktop" ).toggleClass( "activeMenu" );
    });
    $( ".closeMobMenu" ).click(function() {
        $( ".menuDesktop" ).removeClass( "activeMenu" );
    });

    // Máscaras Form de Registro
    $('#inputCpf').mask('000.000.000-00', {reverse: true});
    $('#cep').mask('00000-000');
    $('#inputCpfRegister').mask('000.000.000-00');
    var maskBehavior = function (val) {
	    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
	  },
	  options = {onKeyPress: function(val, e, field, options) {
	  field.mask(maskBehavior.apply({}, arguments), options);
	  }
	};
	$('.maskPhoneInput').mask(maskBehavior, options);
    

    // Função de puxar infos automáticas através do CEP
    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");
        $("#ibge").val("");
    }
    
    //Quando o campo cep perde o foco.
    $("#cep").blur(function() {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#rua").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#uf").val("...");
                $("#ibge").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#rua").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#uf").val(dados.uf);
                        $("#ibge").val(dados.ibge);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });

    //Forms Validations
    $( "#registerForm" ).validate({
        rules: {
            inputNameRegister: {
                minlength: 3,
                maxlength: 50
            },
            inputCpfRegister: {
                minlength: 3,
            },
            inputLoginRegister: {
                minlength: 3,
                maxlength: 20
            },
            inputPasswordRegister: {
                minlength: 3,
                maxlength: 255
            },
            inputEmailRegister: {
                minlength: 3,
                maxlength: 50
            },
            inputPhoneRegister: {
                minlength: 3,
            },
        }
    });

    $( "#adminForm" ).validate({
        rules: {
            nomeAdmin: {
                minlength: 3,
                maxlength: 50
            },
            loginAdmin: {
                minlength: 3,
                maxlength: 20
            },
            senhaAdmin: {
                minlength: 3,
                maxlength: 255
            },
        }
    });

    $( "#classForm" ).validate({
        rules: {
            dataMatricula: {
                required: false,
                date: true
            }
        }
    });

    $( "#courseForm" ).validate({
        rules: {
            nomeCurso: {
                minlength: 3,
                maxlength: 50
            },
            requisitoCurso: {
                maxlength: 255
            },
            ementaCurso: {
                maxlength: 255
            }
        }
    });

    $( "#instrutorForm" ).validate({
        rules: {
            nomeInstrutor: {
                minlength: 3,
                maxlength: 50
            },
            loginInstrutor: {
                minlength: 3,
                maxlength: 20
            },
            senhaInstrutor: {
                minlength: 3,
                maxlength: 255
            },
            emailInstrutor: {
                minlength: 3,
                maxlength: 50
            }
        }
    });

    $( "#classInstrutorForm" ).validate({
        rules: {
            dataMatricula: {
                date: true
            },
            dataMatricula: {
                date: true
            }
        }
    });
    
});