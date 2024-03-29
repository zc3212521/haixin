(function(window, $) {
        var YdxLazyLoad = function(window, $) {
            var defaultOption = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll resize",
                effect: "fadeIn",
                container: window,
                effectTime: 300,
                callback: null
            };
            var optionHandel = {
                setOption: function(element, opt) {
                    return element.data("_YdxLazyLoadOption_", opt);
                },
                getOption: function(element) {
                    return element.data("_YdxLazyLoadOption_");
                },
                removeOption: function(element) {
                    return element.removeData("_YdxLazyLoadOption_");
                }
            };
            var checkPosition = {
                above: function(element) {
                    var fold, $window = $(window), option = optionHandel.getOption(element);
                    if (option.container === undefined || option.container === window) {
                        fold = $window.height() + $window.scrollTop();
                    } else {
                        fold = $(option.container).offset().top + $(option.container).height();
                    }
                    return fold >= $(element).offset().top + option.threshold;
                },
                below: function(element) {
                    var fold, $window = $(window), option = optionHandel.getOption(element);
                    if (option.container === undefined || option.container === window) {
                        fold = $window.height() + $window.scrollTop();
                    } else {
                        fold = $(option.container).offset().top + $(option.container).height();
                    }
                    return fold <= $(element).offset().top - option.threshold;
                },
                left: function(element) {
                    var fold, $window = $(window), option = optionHandel.getOption(element);
                    if (option.container === undefined || option.container === window) {
                        fold = $window.width() + $window.scrollLeft();
                    } else {
                        fold = $(option.container).offset().left + $(option.container).width();
                    }
                    return fold >= $(element).offset().left + option.threshold;
                },
                right: function(element) {
                    var fold, $window = $(window), option = optionHandel.getOption(element);
                    if (option.container === undefined || option.container === window) {
                        fold = $window.width() + $window.scrollLeft();
                    } else {
                        fold = $(option.container).offset().left + $(option.container).width();
                    }
                    return fold <= $(element).offset().left - option.threshold;
                },
                flag: function(element) {
                    var option = optionHandel.getOption(element);
                    return !$.rightoffold(element, element) && !$.leftofbegin(element, element) && !$.belowthefold(element, element) && !$.abovethetop(element, element);
                }
            };
            function showImg() {
                var $this = $(this)
                    , opt = optionHandel.getOption($this);
                if (!opt.isLoad) {
                    var currentImgSrc = opt.src || $this.attr("lazyLoadSrc");
                    $(new Image()).attr("src", currentImgSrc).load([opt, $this], function(e) {
                        var para = e.data
                            , opt = para[0]
                            , element = para[1];
                        element.attr("src", currentImgSrc).hide()[opt.effect](opt.effectTime);
                        opt.isLoad = true;
                        opt.callback && opt.callback.call(element, currentImgSrc);
                        $(this).unbind("load");
                        opt.onShow && opt.onShow.call(element);
                    });
                }
            }
            function init() {
                $("[lazyLoadSrc]:visible").each(function(i, element) {
                    add($(element));
                });
            }
            function add(element, opt) {
                if (optionHandel.getOption(element)) {
                    return;
                }
                opt = $.extend(true, {}, defaultOption, opt);
                optionHandel.setOption(element, opt).bind("showImg", showImg);
                var $container = $(opt.container)
                    , containerData = {
                    elementMap: {},
                    num: 0
                };
                if (!$container.data("_YdxLazyLoad_container_")) {
                    $container.data("_YdxLazyLoad_container_", containerData);
                } else {
                    containerData = $container.data("_YdxLazyLoad_container_");
                }
                opt._index = containerData.num;
                containerData.elementMap[containerData.num++] = element;
                if (!containerData.isBind || containerData.event !== opt.event) {
                    $container.bind(opt.event, function(e) {
                        var data = $(this).data("_YdxLazyLoad_container_")
                            , elementMap = data.elementMap;
                        $.each(elementMap, function(key, el) {
                            if (el.data("_YdxLazyLoadOption_")) {
                                if (checkPosition.above(el) && checkPosition.left(el)) {
                                    el.trigger("showImg");
                                    delete elementMap[key];
                                }
                            } else {
                                delete elementMap[key];
                                el.remove();
                            }
                        });
                        return false;
                    });
                    containerData.isBind = true;
                    containerData.event = opt.event;
                }
                $.each(opt.event.split(" "), function(i, event) {
                    if (event === 'scroll') {
                        var e = $.Event(event, {
                            scrollTop: $('body').scrollTop()
                        });
                        $container.trigger(e);
                        return;
                    }
                    $container.trigger(event);
                });
            }
            function remove(element) {
                var opt = optionHandel.getOption(element);
                delete $(opt.container).data("_YdxLazyLoad_container_").elementMap[opt._index];
                optionHandel.removeOption(element);
            }
            return {
                init: init,
                add: add,
                remove: remove
            };
        }(window, $);
        $.fn.YdxLazyLoad = function(opt) {
            return this.each(function() {
                switch ($.type(opt)) {
                    case "undefined":
                    case "object":
                        YdxLazyLoad.add($(this), opt);
                        break;
                    case "string":
                        var args = Array.prototype.slice.call(arguments, 1);
                        args.unshift($(this));
                        YdxLazyLoad[opt].call(YdxLazyLoad, args);
                        break;
                }
            });
        }
        ;
    }
)(window, jQuery)
